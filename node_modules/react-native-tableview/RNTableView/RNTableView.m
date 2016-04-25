//
//  SVGUse.m
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//


#import "RCTConvert.h"
#import "RCTUtils.h"
#import "RCTUIManager.h"
#import "RCTRefreshControl.h"

#import "UIView+React.h"
#import "UIView+Private.h"

#import "RNTableView.h"
#import "JSONDataSource.h"
#import "RNCellView.h"
#import "RNTableFooterView.h"
#import "RNTableHeaderView.h"
#import "RNReactModuleCell.h"
#import "RNAppGlobals.h"

@interface RCTEventDispatcher (RCTScrollView)

/**
 * Send a scroll event.
 * (You can send a fake scroll event by passing nil for scrollView).
 */
- (void)sendScrollEventWithType:(RCTScrollEventType)type
                       reactTag:(NSNumber *)reactTag
                     scrollView:(UIScrollView *)scrollView
                       userData:(NSDictionary *)userData;

@end

#pragma mark -
#pragma mark RNTableView

@interface RNTableView() {
    id<RNTableViewDatasource> datasource;
}
@property (strong, nonatomic) NSMutableArray *selectedIndexes;
@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) UIRefreshControl *refreshControl;

@end

@implementation RNTableView {
    RCTBridge *_bridge;
    RCTEventDispatcher *_eventDispatcher;
    NSArray *_items;
    NSMutableArray *_cells;
    NSString *_reactModuleCellReuseIndentifier;

    
    NSTimeInterval _lastScrollDispatchTime;
    NSMutableArray<NSValue *> *_cachedChildFrames;
    BOOL _allowNextScrollNoMatterWhat;
    CGRect _lastClippedToRect;
}

#pragma mark -
#pragma mark Constructors

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _bridge = [[RNAppGlobals sharedInstance] appBridge];
        _eventDispatcher = eventDispatcher;
        _cellHeight = 44;
        _cells = [NSMutableArray array];
        _autoFocus = YES;
        _allowsToggle = NO;
        _allowsMultipleSelection = NO;
    }
    return self;
}

- (void)createTableView {
    _tableView = [[UITableView alloc] initWithFrame:CGRectZero style:_tableViewStyle];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    _tableView.allowsMultipleSelectionDuringEditing = NO;
    _tableView.contentInset = self.contentInset;
    _tableView.contentOffset = self.contentOffset;
    _tableView.scrollIndicatorInsets = self.scrollIndicatorInsets;
    _tableView.backgroundColor = [UIColor clearColor];
    UIView *view = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 0.001, 0.001)];
    _tableView.tableHeaderView = view;
    _tableView.tableFooterView = view;
    _tableView.separatorStyle = self.separatorStyle;
    _reactModuleCellReuseIndentifier = @"ReactModuleCell";
    [_tableView registerClass:[RNReactModuleCell class] forCellReuseIdentifier:_reactModuleCellReuseIndentifier];
    [self addSubview:_tableView];
}

- (void)setTableViewStyle:(UITableViewStyle)tableViewStyle {
    _tableViewStyle = tableViewStyle;
    
    [self createTableView];
}

- (void)dealloc {
    _tableView.delegate = nil;
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)

#pragma mark -

- (void)setSeparatorColor:(UIColor *)separatorColor {
    _separatorColor = separatorColor;
    [self.tableView setSeparatorColor:separatorColor];
}

- (void)setContentOffset:(CGPoint)offset {
    _contentOffset = offset;
    _tableView.contentOffset = offset;
}

#pragma mark -
#pragma mark React View Hierarchy

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    // will not insert because we don't need to draw them
    //   [super insertSubview:subview atIndex:atIndex];
    
    // just add them to registry
    if ([subview isKindOfClass:[RNCellView class]]){
        RNCellView *cellView = (RNCellView *)subview;
        cellView.tableView = self.tableView;
        while (cellView.section >= [_cells count]){
            [_cells addObject:[NSMutableArray array]];
        }
        [_cells[cellView.section] addObject:subview];
        if (cellView.section == [_sections count]-1 && cellView.row == [_sections[cellView.section][@"count"] integerValue]-1){
            [self.tableView reloadData];
        }
    } else if ([subview isKindOfClass:[RNTableFooterView class]]){
        RNTableFooterView *footerView = (RNTableFooterView *)subview;
        footerView.tableView = self.tableView;
    } else if ([subview isKindOfClass:[RNTableHeaderView class]]){
        RNTableHeaderView *headerView = (RNTableHeaderView *)subview;
        headerView.tableView = self.tableView;
    } else if ([subview isKindOfClass:[RCTRefreshControl class]]) {
        [self addRefreshControl:(UIRefreshControl *)subview];
    }
}

- (void)removeReactSubview:(UIView *)subview {
    if ([subview isKindOfClass:[RCTRefreshControl class]]) {
        [self removeRefreshControl];
    }
}

- (NSArray<UIView *> *)reactSubviews {
    if (self.refreshControl) {
        return @[self.refreshControl];
    }
    return @[];
}

#pragma mark -
#pragma mark Refresh Control

- (void)addRefreshControl:(UIRefreshControl *)refreshControl {
    // remove old refreshControl
    [self removeRefreshControl];
    // add new refreshControl
    self.refreshControl = refreshControl;
    [self.tableView addSubview:refreshControl];
}

- (void)removeRefreshControl {
    [self.refreshControl removeFromSuperview];
    self.refreshControl = nil;
}

- (void)setOnRefreshStart:(RCTDirectEventBlock)onRefreshStart {
    if (!onRefreshStart) {
        _onRefreshStart = nil;
        [self removeRefreshControl];
        return;
    }
    _onRefreshStart = [onRefreshStart copy];
    
    if (!self.refreshControl) {
        UIRefreshControl *refreshControl = [[UIRefreshControl alloc] init];
        [refreshControl addTarget:self action:@selector(refreshControlValueChanged) forControlEvents:UIControlEventValueChanged];
        [self addRefreshControl:refreshControl];
    }
}

- (void)refreshControlValueChanged {
    if (self.onRefreshStart) {
        self.onRefreshStart(nil);
    }
}

- (void)endRefreshing {
    [self.refreshControl endRefreshing];
}

#pragma mark -

- (void)setRemoveClippedSubviews:(__unused BOOL)removeClippedSubviews {
    // Does nothing
}

- (void)setClipsToBounds:(BOOL)clipsToBounds {
    super.clipsToBounds = clipsToBounds;
    _tableView.clipsToBounds = clipsToBounds;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    RCTAssert(self.subviews.count == 1, @"we should only have exactly one subview");
    RCTAssert([self.subviews lastObject] == _tableView, @"our only subview should be a tableview");
    
    CGPoint originalOffset = _tableView.contentOffset;
    _tableView.frame = self.bounds;
    _tableView.contentOffset = originalOffset;
    
    // if sections are not define, try to load JSON
    if (![_sections count] && _json){
        datasource = [[JSONDataSource alloc] initWithFilename:_json filter:_filter args:_filterArgs];
        self.sections = [NSMutableArray arrayWithArray:[datasource sections]];
    }
    
    // find first section with selection
    NSInteger selectedSection = -1;
    for (int i=0;i<[_selectedIndexes count];i++){
        if ([_selectedIndexes[i] intValue] != -1){
            selectedSection = i;
            break;
        }
    }
    // focus of first selected value
    if (_autoFocus && selectedSection>=0 && [self numberOfSectionsInTableView:self.tableView] && [self tableView:self.tableView numberOfRowsInSection:selectedSection]){
        dispatch_async(dispatch_get_main_queue(), ^{
            NSIndexPath *indexPath = [NSIndexPath indexPathForItem:[_selectedIndexes[selectedSection] intValue ]inSection:selectedSection];
            [self.tableView scrollToRowAtIndexPath:indexPath atScrollPosition:UITableViewScrollPositionMiddle animated:YES];
        });
    }
}

#pragma mark -
#pragma mark Private APIs

#pragma mark -
#pragma mark Item Description Data

- (void)setSections:(NSArray *)sections {
    
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    
    // create selected indexes
    _selectedIndexes = [NSMutableArray arrayWithCapacity:[sections count]];
    
//    BOOL found = NO;
    for (NSDictionary *section in sections) {
        NSMutableDictionary *sectionData = [NSMutableDictionary dictionaryWithDictionary:section];
        NSMutableArray *allItems = [NSMutableArray array];
        if (self.additionalItems){
            [allItems addObjectsFromArray:self.additionalItems];
        }
        [allItems addObjectsFromArray:sectionData[@"items"]];
        
        NSMutableArray *items = [NSMutableArray arrayWithCapacity:[allItems count]];
        NSInteger selectedIndex = -1;
        for (NSDictionary *item in allItems){
            NSMutableDictionary *itemData = [NSMutableDictionary dictionaryWithDictionary:item];
            if ((itemData[@"selected"] && [itemData[@"selected"] intValue])
                || (self.selectedValue && [self.selectedValue isEqual:item[@"value"]]))
            {
                if (selectedIndex == -1)
                    selectedIndex = [items count];
                itemData[@"selected"] = @YES;
//                found = YES;
            }
            [items addObject:itemData];
        }
        [_selectedIndexes addObject:[NSNumber numberWithUnsignedInteger:selectedIndex]];
        
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
    [self.tableView reloadData];
}

- (NSMutableDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section {
    return (NSMutableDictionary *)_sections[section][@"items"][row];
}

- (BOOL)hasCustomCells:(NSInteger)section {
    return [[_sections[section] valueForKey:@"customCells"] boolValue];
}

#pragma mark -
#pragma mark Section Header

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    if (_sections[section][@"headerHeight"]){
        return [_sections[section][@"headerHeight"] floatValue] ? [_sections[section][@"headerHeight"] floatValue] : 0.000001;
    } else {
        if (self.headerHeight){
            return self.headerHeight;
        }
        return -1;
    }
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return _sections[section][@"label"];
}

- (void)tableView:(UITableView *)tableView willDisplayHeaderView:(UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *header = (UITableViewHeaderFooterView *)view;
    
    if (self.headerTextColor){
        header.textLabel.textColor = self.headerTextColor;
    }
    if (self.headerFont){
        header.textLabel.font = self.headerFont;
    }
}

#pragma mark -
#pragma mark Section Footer

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section{
    if (_sections[section][@"footerHeight"]){
        return [_sections[section][@"footerHeight"] floatValue] ? [_sections[section][@"footerHeight"] floatValue] : 0.000001;
        
    } else {
        if (self.footerHeight){
            return self.footerHeight;
        }
        return -1;
    }
}

- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section {
    return _sections[section][@"footerLabel"];
}

- (void)tableView:(UITableView *)tableView willDisplayFooterView:(nonnull UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *footer = (UITableViewHeaderFooterView *)view;
    
    if (self.footerTextColor){
        footer.textLabel.textColor = self.footerTextColor;
    }
    if (self.footerFont){
        footer.textLabel.font = self.footerFont;
    }
}

#pragma mark -
#pragma mark Cells

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [_sections count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger count = [_sections[section][@"items"] count];
    // if we have custom cells, additional processing is necessary
    if ([self hasCustomCells:section]){
        if ([_cells count]<=section){
            return 0;
        }
        // don't display cells until their's height is not calculated (TODO: maybe it is possible to optimize??)
        for (RNCellView *view in _cells[section]){
            if (!view.componentHeight){
                return 0;
            }
        }
        count = [_cells[section] count];
    }
    return count;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (![self hasCustomCells:indexPath.section]){
        NSNumber *styleHeight = _sections[indexPath.section][@"items"][indexPath.row][@"height"];
        return styleHeight.floatValue ?: _cellHeight;
    } else {
        RNCellView *cell = (RNCellView *)_cells[indexPath.section][indexPath.row];
        CGFloat height =  cell.componentHeight;
        return height;
    }
}

- (UITableViewCell *)setupReactModuleCell:(UITableView *)tableView data:(NSDictionary *)data indexPath:(NSIndexPath *)indexPath {
    RCTAssert(_bridge, @"Must set global bridge in AppDelegate, e.g. \n\
              #import <RNTableView/RNAppGlobals.h>\n\
              [[RNAppGlobals sharedInstance] setAppBridge:rootView.bridge]");
    RNReactModuleCell *cell = [tableView dequeueReusableCellWithIdentifier:_reactModuleCellReuseIndentifier];
    if (cell == nil) {
        cell = [[RNReactModuleCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:_reactModuleCellReuseIndentifier bridge: _bridge data:data indexPath:indexPath reactModule:_reactModuleForCell tableViewTag:self.reactTag];
    } else {
        [cell setUpAndConfigure:data bridge:_bridge indexPath:indexPath reactModule:_reactModuleForCell tableViewTag:self.reactTag];
    }
    return cell;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = nil;
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    
    // check if it is standard cell or user-defined UI
    if ([self hasCustomCells:indexPath.section]){
        cell = ((RNCellView *)_cells[indexPath.section][indexPath.row]).tableViewCell;
    } else if (self.reactModuleForCell != nil && ![self.reactModuleForCell isEqualToString:@""]) {
        cell = [self setupReactModuleCell:tableView data:item indexPath:indexPath];
    } else {
        cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
        if (cell == nil) {
            cell = [[UITableViewCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:@"Cell"];
        }
        cell.textLabel.text = item[@"label"];
        cell.detailTextLabel.text = item[@"detail"];
    }
    
    if (item[@"selected"] && [item[@"selected"] intValue]){
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    } else if ([item[@"arrow"] intValue]) {
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    } else {
        cell.accessoryType = UITableViewCellAccessoryNone;
    }
    if ([item[@"transparent"] intValue]) {
        cell.backgroundColor = [UIColor clearColor];
    }
    if (item[@"selectionStyle"]) {
        cell.selectionStyle = [item[@"selectionStyle"] intValue];
    }
    return cell;
}

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.emptyInsets){
        // Remove separator inset
        if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
            [cell setSeparatorInset:UIEdgeInsetsZero];
        }
        
        // Prevent the cell from inheriting the Table View's margin settings
        if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)]) {
            [cell setPreservesSuperviewLayoutMargins:NO];
        }
        
        // Explictly set your cell's layout margins
        if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
            [cell setLayoutMargins:UIEdgeInsetsZero];
        }
    }
    if (self.font){
        cell.detailTextLabel.font = self.font;
        cell.textLabel.font = self.font;
    }
    if (self.tintColor){
        cell.tintColor = self.tintColor;
    }
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    if (self.selectedTextColor && [item[@"selected"] intValue]){
        cell.textLabel.textColor = self.selectedTextColor;
        cell.detailTextLabel.textColor = self.selectedTextColor;
    } else {
        if (self.textColor){
            cell.textLabel.textColor = self.textColor;
            cell.detailTextLabel.textColor = self.textColor;
        }
        if (self.detailTextColor){
            cell.detailTextLabel.textColor = self.detailTextColor;
        }
        
    }
    if (item[@"image"]) {
        UIImage *image = [UIImage imageNamed:item[@"image"]];
        if ([item[@"imageWidth"] intValue]) {
            CGSize itemSize = CGSizeMake([item[@"imageWidth"] intValue], image.size.height);
            CGPoint itemPoint = CGPointMake((itemSize.width - image.size.width) / 2, (itemSize.height - image.size.height) / 2);
            UIGraphicsBeginImageContextWithOptions(itemSize, NO, UIScreen.mainScreen.scale);
            [image drawAtPoint:itemPoint];
            cell.imageView.image = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
        } else {
            cell.imageView.image = image;
        }
    }
    [_eventDispatcher sendInputEventWithName:@"onWillDisplayCell" body:@{@"target":self.reactTag, @"row":@(indexPath.row), @"section": @(indexPath.section)}];
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [_eventDispatcher sendInputEventWithName:@"onEndDisplayingCell" body:@{@"target":self.reactTag, @"row":@(indexPath.row), @"section": @(indexPath.section)}];
}

#pragma mark Select Row

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    
    NSInteger selectedIndex = [self.selectedIndexes[indexPath.section] integerValue];
    NSMutableDictionary *oldValue = selectedIndex>=0 ?[self dataForRow:selectedIndex section:indexPath.section] : [NSMutableDictionary dictionaryWithDictionary:@{}];
    
    NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
    newValue[@"target"] = self.reactTag;
    newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
    newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];

    /*
     * if allowToggle is enabled and we tap an already selected row, then remove the selection.
     * otherwise, add selection to the new row and remove selection from old row if multiple is not allowed.
     * default: allowMultipleSelection:false and allowToggle: false
     */
    if ((oldValue[@"selected"] && [oldValue[@"selected"] intValue]) || self.selectedValue){
        if (_allowsToggle && newValue[@"selected"] && [newValue[@"selected"] intValue]) {
            [newValue removeObjectForKey:@"selected"];
        } else {
            if (!_allowsMultipleSelection) {
                [oldValue removeObjectForKey:@"selected"];
            }
            [newValue setObject:@1 forKey:@"selected"];
        }
        [self.tableView reloadData];
    }

    [_eventDispatcher sendInputEventWithName:@"press" body:newValue];
    self.selectedIndexes[indexPath.section] = [NSNumber numberWithInteger:indexPath.item];
}

#pragma mark Moving

- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    NSMutableDictionary *value = [self dataForRow:indexPath.item section:indexPath.section];
    return [value[@"canMove"] boolValue];
}

- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)sourceIndexPath toIndexPath:(NSIndexPath *)destinationIndexPath {
    [_eventDispatcher sendInputEventWithName:@"change" body:@{@"target":self.reactTag, @"sourceIndex":@(sourceIndexPath.row), @"sourceSection": @(sourceIndexPath.section), @"destinationIndex":@(destinationIndexPath.row), @"destinationSection":@(destinationIndexPath.section), @"mode": @"move"}];
}

- (NSIndexPath *)tableView:(UITableView *)tableView targetIndexPathForMoveFromRowAtIndexPath:(NSIndexPath *)sourceIndexPath toProposedIndexPath:(NSIndexPath *)proposedDestinationIndexPath {
    if (self.moveWithinSectionOnly && sourceIndexPath.section != proposedDestinationIndexPath.section) {
        return sourceIndexPath;
    }
    return proposedDestinationIndexPath;
}

#pragma mark Editing

- (void)setEditing:(BOOL)editing {
    [self.tableView setEditing:editing animated:YES];
}

- (BOOL)editing {
    return self.tableView.editing;
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    NSMutableDictionary *value = [self dataForRow:indexPath.item section:indexPath.section];
    return [value[@"canEdit"] boolValue];
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath { //implement the delegate method
    
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
        newValue[@"target"] = self.reactTag;
        newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
        newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];
        newValue[@"mode"] = @"delete";
        
        [_eventDispatcher sendInputEventWithName:@"change" body:newValue];
        
        [_sections[indexPath.section][@"items"] removeObjectAtIndex:indexPath.row];
        [self.tableView reloadData];
    }
}

- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView
          editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath {
    return self.tableViewCellEditingStyle;
}

- (BOOL)tableView:(UITableView *)tableView shouldIndentWhileEditingRowAtIndexPath:(NSIndexPath *)indexPath{
    if (self.tableViewCellEditingStyle == UITableViewCellEditingStyleNone) {
        return NO;
    }
    return YES;
}

#pragma mark -
#pragma mark RCTAutoInsetsProtocol

- (void)setContentInset:(UIEdgeInsets)contentInset {
    CGPoint contentOffset = self.tableView.contentOffset;
    
    _contentInset = contentInset;
    [RCTView autoAdjustInsetsForView:self
                      withScrollView:self.tableView
                        updateOffset:NO];
    
    self.tableView.contentOffset = contentOffset;
}

- (void)refreshContentInset {
    [RCTView autoAdjustInsetsForView:self
                      withScrollView:self.tableView
                        updateOffset:YES];
}

#pragma mark -
#pragma mark RCTScrollableProtocol

@synthesize nativeScrollDelegate = _nativeScrollDelegate;
@synthesize contentSize = _contentSize;

- (void)scrollToOffset:(CGPoint)offset {
    [self scrollToOffset:offset animated:YES];
}

- (void)scrollToOffset:(CGPoint)offset animated:(BOOL)animated {
    if (!CGPointEqualToPoint(_tableView.contentOffset, offset)) {
        [_tableView setContentOffset:offset animated:animated];
    }
}

- (void)zoomToRect:(CGRect)rect animated:(BOOL)animated {
    [_tableView zoomToRect:rect animated:animated];
}

#pragma mark -
#pragma mark UIScrollViewDelegate

#define RCT_SCROLL_EVENT_HANDLER(delegateMethod, eventName) \
- (void)delegateMethod:(UIScrollView *)scrollView { \
    [_eventDispatcher sendScrollEventWithType:eventName reactTag:self.reactTag scrollView:scrollView userData:nil]; \
    if ([_nativeScrollDelegate respondsToSelector:_cmd]) { \
        [_nativeScrollDelegate delegateMethod:scrollView]; \
    } \
}

#define RCT_FORWARD_SCROLL_EVENT(call) \
if ([_nativeScrollDelegate respondsToSelector:_cmd]) { \
    [_nativeScrollDelegate call]; \
}

RCT_SCROLL_EVENT_HANDLER(scrollViewDidEndScrollingAnimation, RCTScrollEventTypeEndDeceleration)
RCT_SCROLL_EVENT_HANDLER(scrollViewWillBeginDecelerating, RCTScrollEventTypeStartDeceleration)
RCT_SCROLL_EVENT_HANDLER(scrollViewDidEndDecelerating, RCTScrollEventTypeEndDeceleration)
RCT_SCROLL_EVENT_HANDLER(scrollViewDidZoom, RCTScrollEventTypeMove)

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    //    [_tableView dockClosestSectionHeader];
    [self updateClippedSubviews];
    
    NSTimeInterval now = CACurrentMediaTime();
    
    /**
     * TODO: this logic looks wrong, and it may be because it is. Currently, if _scrollEventThrottle
     * is set to zero (the default), the "didScroll" event is only sent once per scroll, instead of repeatedly
     * while scrolling as expected. However, if you "fix" that bug, ScrollView will generate repeated
     * warnings, and behave strangely (ListView works fine however), so don't fix it unless you fix that too!
     */
    if (_allowNextScrollNoMatterWhat ||
        (_scrollEventThrottle > 0 && _scrollEventThrottle < (now - _lastScrollDispatchTime))) {
        
        // Dispatch event
        [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeMove
                                         reactTag:self.reactTag
                                       scrollView:scrollView
                                         userData:nil];
        
        // Update dispatch time
        _lastScrollDispatchTime = now;
        _allowNextScrollNoMatterWhat = NO;
    }
    RCT_FORWARD_SCROLL_EVENT(scrollViewDidScroll:scrollView);
}

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView {
    _allowNextScrollNoMatterWhat = YES; // Ensure next scroll event is recorded, regardless of throttle
    [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeStart reactTag:self.reactTag scrollView:scrollView userData:nil];
    RCT_FORWARD_SCROLL_EVENT(scrollViewWillBeginDragging:scrollView);
}

- (void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset {
    // snapToInterval
    // An alternative to enablePaging which allows setting custom stopping intervals,
    // smaller than a full page size. Often seen in apps which feature horizonally
    // scrolling items. snapToInterval does not enforce scrolling one interval at a time
    // but guarantees that the scroll will stop at an interval point.
    if (self.snapToInterval) {
        CGFloat snapToIntervalF = (CGFloat)self.snapToInterval;
        
        // Find which axis to snap
        BOOL isHorizontal = (scrollView.contentSize.width > self.frame.size.width);
        
        // What is the current offset?
        CGFloat targetContentOffsetAlongAxis = isHorizontal ? targetContentOffset->x : targetContentOffset->y;
        
        // Which direction is the scroll travelling?
        CGPoint translation = [scrollView.panGestureRecognizer translationInView:scrollView];
        CGFloat translationAlongAxis = isHorizontal ? translation.x : translation.y;
        
        // Offset based on desired alignment
        CGFloat frameLength = isHorizontal ? self.frame.size.width : self.frame.size.height;
        CGFloat alignmentOffset = 0.0f;
        if ([self.snapToAlignment  isEqualToString: @"center"]) {
            alignmentOffset = (frameLength * 0.5f) + (snapToIntervalF * 0.5f);
        } else if ([self.snapToAlignment  isEqualToString: @"end"]) {
            alignmentOffset = frameLength;
        }
        
        // Pick snap point based on direction and proximity
        NSInteger snapIndex = floor((targetContentOffsetAlongAxis + alignmentOffset) / snapToIntervalF);
        snapIndex = (translationAlongAxis < 0) ? snapIndex + 1 : snapIndex;
        CGFloat newTargetContentOffset = ( snapIndex * snapToIntervalF ) - alignmentOffset;
        
        // Set new targetContentOffset
        if (isHorizontal) {
            targetContentOffset->x = newTargetContentOffset;
        } else {
            targetContentOffset->y = newTargetContentOffset;
        }
    }
    
    NSDictionary *userData = @{
                               @"velocity": @{
                                       @"x": @(velocity.x),
                                       @"y": @(velocity.y)
                                       },
                               @"targetContentOffset": @{
                                       @"x": @(targetContentOffset->x),
                                       @"y": @(targetContentOffset->y)
                                       }
                               };
    [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeEnd reactTag:self.reactTag scrollView:scrollView userData:userData];
    
    RCT_FORWARD_SCROLL_EVENT(scrollViewWillEndDragging:scrollView withVelocity:velocity targetContentOffset:targetContentOffset);
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    RCT_FORWARD_SCROLL_EVENT(scrollViewDidEndDragging:scrollView willDecelerate:decelerate);
}

- (void)scrollViewWillBeginZooming:(UIScrollView *)scrollView withView:(UIView *)view
{
    [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeStart reactTag:self.reactTag scrollView:scrollView userData:nil];
    RCT_FORWARD_SCROLL_EVENT(scrollViewWillBeginZooming:scrollView withView:view);
}

- (void)scrollViewDidEndZooming:(UIScrollView *)scrollView withView:(UIView *)view atScale:(CGFloat)scale
{
    [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeEnd reactTag:self.reactTag scrollView:scrollView userData:nil];
    RCT_FORWARD_SCROLL_EVENT(scrollViewDidEndZooming:scrollView withView:view atScale:scale);
}

- (BOOL)scrollViewShouldScrollToTop:(UIScrollView *)scrollView
{
    if ([_nativeScrollDelegate respondsToSelector:_cmd]) {
        return [_nativeScrollDelegate scrollViewShouldScrollToTop:scrollView];
    }
    return YES;
}

//- (UIView *)viewForZoomingInScrollView:(__unused UIScrollView *)scrollView
//{
//    return _contentView;
//}

#pragma mark -
#pragma mark ScrollView APIs

- (CGSize)_calculateViewportSize {
    CGSize viewportSize = self.bounds.size;
    if (_automaticallyAdjustContentInsets) {
        UIEdgeInsets contentInsets = [RCTView contentInsetsForView:self];
        viewportSize = CGSizeMake(self.bounds.size.width - contentInsets.left - contentInsets.right,
                                  self.bounds.size.height - contentInsets.top - contentInsets.bottom);
    }
    return viewportSize;
}

- (CGPoint)calculateOffsetForContentSize:(CGSize)newContentSize
{
    CGPoint oldOffset = _tableView.contentOffset;
    CGPoint newOffset = oldOffset;
    
    CGSize oldContentSize = _tableView.contentSize;
    CGSize viewportSize = [self _calculateViewportSize];
    
    BOOL fitsinViewportY = oldContentSize.height <= viewportSize.height && newContentSize.height <= viewportSize.height;
    if (newContentSize.height < oldContentSize.height && !fitsinViewportY) {
        CGFloat offsetHeight = oldOffset.y + viewportSize.height;
        if (oldOffset.y < 0) {
            // overscrolled on top, leave offset alone
        } else if (offsetHeight > oldContentSize.height) {
            // overscrolled on the bottom, preserve overscroll amount
            newOffset.y = MAX(0, oldOffset.y - (oldContentSize.height - newContentSize.height));
        } else if (offsetHeight > newContentSize.height) {
            // offset falls outside of bounds, scroll back to end of list
            newOffset.y = MAX(0, newContentSize.height - viewportSize.height);
        }
    }
    
    BOOL fitsinViewportX = oldContentSize.width <= viewportSize.width && newContentSize.width <= viewportSize.width;
    if (newContentSize.width < oldContentSize.width && !fitsinViewportX) {
        CGFloat offsetHeight = oldOffset.x + viewportSize.width;
        if (oldOffset.x < 0) {
            // overscrolled at the beginning, leave offset alone
        } else if (offsetHeight > oldContentSize.width && newContentSize.width > viewportSize.width) {
            // overscrolled at the end, preserve overscroll amount as much as possible
            newOffset.x = MAX(0, oldOffset.x - (oldContentSize.width - newContentSize.width));
        } else if (offsetHeight > newContentSize.width) {
            // offset falls outside of bounds, scroll back to end
            newOffset.x = MAX(0, newContentSize.width - viewportSize.width);
        }
    }
    
    // all other cases, offset doesn't change
    return newOffset;
}

/**
 * Once you set the `contentSize`, to a nonzero value, it is assumed to be
 * managed by you, and we'll never automatically compute the size for you,
 * unless you manually reset it back to {0, 0}
 */
- (CGSize)contentSize {
    return _tableView.contentSize;
}

- (void)reactBridgeDidFinishTransaction {
    CGSize contentSize = self.contentSize;
    if (!CGSizeEqualToSize(_tableView.contentSize, contentSize)) {
        // When contentSize is set manually, ScrollView internals will reset
        // contentOffset to  {0, 0}. Since we potentially set contentSize whenever
        // anything in the ScrollView updates, we workaround this issue by manually
        // adjusting contentOffset whenever this happens
        CGPoint newOffset = [self calculateOffsetForContentSize:contentSize];
        _tableView.contentSize = contentSize;
        self.contentOffset = newOffset;
    }
}

// Note: setting several properties of UIScrollView has the effect of
// resetting its contentOffset to {0, 0}. To prevent this, we generate
// setters here that will record the contentOffset beforehand, and
// restore it after the property has been set.

#define RCT_SET_AND_PRESERVE_OFFSET(setter, type)     \
- (void)setter:(type)value                            \
{                                                     \
    CGPoint contentOffset = _tableView.contentOffset; \
    [_tableView setter:value];                        \
    _tableView.contentOffset = contentOffset;         \
}

RCT_SET_AND_PRESERVE_OFFSET(setAlwaysBounceHorizontal, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setAlwaysBounceVertical, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setBounces, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setBouncesZoom, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setCanCancelContentTouches, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setDecelerationRate, CGFloat)
RCT_SET_AND_PRESERVE_OFFSET(setDirectionalLockEnabled, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setKeyboardDismissMode, UIScrollViewKeyboardDismissMode)
RCT_SET_AND_PRESERVE_OFFSET(setMaximumZoomScale, CGFloat)
RCT_SET_AND_PRESERVE_OFFSET(setMinimumZoomScale, CGFloat)
RCT_SET_AND_PRESERVE_OFFSET(setPagingEnabled, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setScrollEnabled, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setScrollsToTop, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setShowsHorizontalScrollIndicator, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setShowsVerticalScrollIndicator, BOOL)
RCT_SET_AND_PRESERVE_OFFSET(setZoomScale, CGFloat);
RCT_SET_AND_PRESERVE_OFFSET(setScrollIndicatorInsets, UIEdgeInsets);

#pragma mark - Forward methods and properties to underlying UIScrollView

- (BOOL)respondsToSelector:(SEL)aSelector {
    return [super respondsToSelector:aSelector] || [_tableView respondsToSelector:aSelector];
}

- (void)setValue:(id)value forUndefinedKey:(NSString *)key {
    [_tableView setValue:value forKey:key];
}

- (id)valueForUndefinedKey:(NSString *)key {
    return [_tableView valueForKey:key];
}

@end

