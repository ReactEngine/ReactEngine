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


#pragma mark -
#pragma mark RNCustomTableView

/**
 * Include a custom table view subclass because we want to limit certain
 * default UIKit behaviors such as textFields automatically scrolling
 * scroll views that contain them and support sticky headers.
 */
@interface RNCustomTableView : UITableView <UIGestureRecognizerDelegate>

@property (nonatomic, copy) NSIndexSet *stickyHeaderIndices;
@property (nonatomic, assign) BOOL centerContent;
@property (nonatomic, strong) UIRefreshControl *refreshControl;

@end


@implementation RNCustomTableView

//- (instancetype)initWithFrame:(CGRect)frame
//{
//    if ((self = [super initWithFrame:frame])) {
//        [self.panGestureRecognizer addTarget:self action:@selector(handleCustomPan:)];
//    }
//    return self;
//}

//- (UIView *)contentView
//{
//    return ((RNTableView *)self.superview).contentView;
//}

/**
 * @return Whether or not the scroll view interaction should be blocked because
 * JS was found to be the responder.
 */
- (BOOL)_shouldDisableScrollInteraction
{
    // Since this may be called on every pan, we need to make sure to only climb
    // the hierarchy on rare occasions.
    UIView *JSResponder = [RCTUIManager JSResponder];
    if (JSResponder && JSResponder != self.superview) {
        BOOL superviewHasResponder = [self isDescendantOfView:JSResponder];
        return superviewHasResponder;
    }
    return NO;
}

//- (void)handleCustomPan:(__unused UIPanGestureRecognizer *)sender
//{
//    if ([self _shouldDisableScrollInteraction] && ![[RCTUIManager JSResponder] isKindOfClass:[RNTableView class]]) {
//        self.panGestureRecognizer.enabled = NO;
//        self.panGestureRecognizer.enabled = YES;
//        // TODO: If mid bounce, animate the scroll view to a non-bounced position
//        // while disabling (but only if `stopScrollInteractionIfJSHasResponder` was
//        // called *during* a `pan`. Currently, it will just snap into place which
//        // is not so bad either.
//        // Another approach:
//        // self.scrollEnabled = NO;
//        // self.scrollEnabled = YES;
//    }
//}

//- (void)scrollRectToVisible:(__unused CGRect)rect animated:(__unused BOOL)animated {
//    // noop
//}

/**
 * Returning `YES` cancels touches for the "inner" `view` and causes a scroll.
 * Returning `NO` causes touches to be directed to that inner view and prevents
 * the scroll view from scrolling.
 *
 * `YES` -> Allows scrolling.
 * `NO` -> Doesn't allow scrolling.
 *
 * By default this returns NO for all views that are UIControls and YES for
 * everything else. What that does is allows scroll views to scroll even when a
 * touch started inside of a `UIControl` (`UIButton` etc). For React scroll
 * views, we want the default to be the same behavior as `UIControl`s so we
 * return `YES` by default. But there's one case where we want to block the
 * scrolling no matter what: When JS believes it has its own responder lock on
 * a view that is *above* the scroll view in the hierarchy. So we abuse this
 * `touchesShouldCancelInContentView` API in order to stop the scroll view from
 * scrolling in this case.
 *
 * We are not aware of *any* other solution to the problem because alternative
 * approaches require that we disable the scrollview *before* touches begin or
 * move. This approach (`touchesShouldCancelInContentView`) works even if the
 * JS responder is set after touches start/move because
 * `touchesShouldCancelInContentView` is called as soon as the scroll view has
 * been touched and dragged *just* far enough to decide to begin the "drag"
 * movement of the scroll interaction. Returning `NO`, will cause the drag
 * operation to fail.
 *
 * `touchesShouldCancelInContentView` will stop the *initialization* of a
 * scroll pan gesture and most of the time this is sufficient. On rare
 * occasion, the scroll gesture would have already initialized right before JS
 * notifies native of the JS responder being set. In order to recover from that
 * timing issue we have a fallback that kills any ongoing pan gesture that
 * occurs when native is notified of a JS responder.
 *
 * Note: Explicitly returning `YES`, instead of relying on the default fixes
 * (at least) one bug where if you have a UIControl inside a UIScrollView and
 * tap on the UIControl and then start dragging (to scroll), it won't scroll.
 * Chat with andras for more details.
 *
 * In order to have this called, you must have delaysContentTouches set to NO
 * (which is the not the `UIKit` default).
 */
- (BOOL)touchesShouldCancelInContentView:(__unused UIView *)view
{
    //TODO: shouldn't this call super if _shouldDisableScrollInteraction returns NO?
    return ![self _shouldDisableScrollInteraction];
}

- (void)useless {
/*
 * Automatically centers the content such that if the content is smaller than the
 * ScrollView, we force it to be centered, but when you zoom or the content otherwise
 * becomes larger than the ScrollView, there is no padding around the content but it
 * can still fill the whole view.
 */
//- (void)setContentOffset:(CGPoint)contentOffset
//{
//    UIView *contentView = [self contentView];
//    if (contentView && _centerContent) {
//        CGSize subviewSize = contentView.frame.size;
//        CGSize scrollViewSize = self.bounds.size;
//        if (subviewSize.width < scrollViewSize.width) {
//            contentOffset.x = -(scrollViewSize.width - subviewSize.width) / 2.0;
//        }
//        if (subviewSize.height < scrollViewSize.height) {
//            contentOffset.y = -(scrollViewSize.height - subviewSize.height) / 2.0;
//        }
//    }
//    super.contentOffset = contentOffset;
//}

//- (void)dockClosestSectionHeader
//{
//    UIView *contentView = [self contentView];
//    CGFloat scrollTop = self.bounds.origin.y + self.contentInset.top;
//    
//    // Find the section headers that need to be docked
//    __block UIView *previousHeader = nil;
//    __block UIView *currentHeader = nil;
//    __block UIView *nextHeader = nil;
//    NSUInteger subviewCount = contentView.reactSubviews.count;
//    [_stickyHeaderIndices enumerateIndexesWithOptions:0 usingBlock:
//     ^(NSUInteger idx, __unused BOOL *stop) {
//         
//         if (idx >= subviewCount) {
//             RCTLogError(@"Sticky header index %zd was outside the range {0, %zd}", idx, subviewCount);
//             return;
//         }
//         
//         UIView *header = contentView.reactSubviews[idx];
//         
//         // If nextHeader not yet found, search for docked headers
//         if (!nextHeader) {
//             CGFloat height = header.bounds.size.height;
//             CGFloat top = header.center.y - height * header.layer.anchorPoint.y;
//             if (top > scrollTop) {
//                 nextHeader = header;
//             } else {
//                 previousHeader = currentHeader;
//                 currentHeader = header;
//             }
//         }
//         
//         // Reset transforms for header views
//         header.transform = CGAffineTransformIdentity;
//         header.layer.zPosition = ZINDEX_DEFAULT;
//         
//     }];
//    
//    // If no docked header, bail out
//    if (!currentHeader) {
//        return;
//    }
//    
//    // Adjust current header to hug the top of the screen
//    CGFloat currentFrameHeight = currentHeader.bounds.size.height;
//    CGFloat currentFrameTop = currentHeader.center.y - currentFrameHeight * currentHeader.layer.anchorPoint.y;
//    CGFloat yOffset = scrollTop - currentFrameTop;
//    if (nextHeader) {
//        // The next header nudges the current header out of the way when it reaches
//        // the top of the screen
//        CGFloat nextFrameHeight = nextHeader.bounds.size.height;
//        CGFloat nextFrameTop = nextHeader.center.y - nextFrameHeight * nextHeader.layer.anchorPoint.y;
//        CGFloat overlap = currentFrameHeight - (nextFrameTop - scrollTop);
//        yOffset -= MAX(0, overlap);
//    }
//    currentHeader.transform = CGAffineTransformMakeTranslation(0, yOffset);
//    currentHeader.layer.zPosition = ZINDEX_STICKY_HEADER;
//    
//    if (previousHeader) {
//        // The previous header sits right above the currentHeader's initial position
//        // so it scrolls away nicely once the currentHeader has locked into place
//        CGFloat previousFrameHeight = previousHeader.bounds.size.height;
//        CGFloat targetCenter = currentFrameTop - previousFrameHeight * (1.0 - previousHeader.layer.anchorPoint.y);
//        yOffset = targetCenter - previousHeader.center.y;
//        previousHeader.transform = CGAffineTransformMakeTranslation(0, yOffset);
//        previousHeader.layer.zPosition = ZINDEX_STICKY_HEADER;
//    }
//}

//- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
//{
//    __block UIView *hitView;
//    
//    [_stickyHeaderIndices enumerateIndexesWithOptions:0 usingBlock:^(NSUInteger idx, BOOL *stop) {
//        UIView *stickyHeader = [self contentView].reactSubviews[idx];
//        CGPoint convertedPoint = [stickyHeader convertPoint:point fromView:self];
//        hitView = [stickyHeader hitTest:convertedPoint withEvent:event];
//        *stop = (hitView != nil);
//    }];
//    
//    return hitView ?: [super hitTest:point withEvent:event];
//}
}
    
- (void)setRefreshControl:(UIRefreshControl *)refreshControl
{
    if (_refreshControl) {
        [_refreshControl removeFromSuperview];
    }
    _refreshControl = refreshControl;
    [self addSubview:_refreshControl];
}

@end


#pragma mark -
#pragma mark RNTableView

@interface RNTableView() {
    id<RNTableViewDatasource> datasource;
}
@property (strong, nonatomic) NSMutableArray *selectedIndexes;
@property (strong, nonatomic) RNCustomTableView *tableView;

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

@synthesize nativeScrollDelegate = _nativeScrollDelegate;
@synthesize contentSize = _contentSize;

-(void)setEditing:(BOOL)editing {
    [self.tableView setEditing:editing animated:YES];
}

-(void) setSeparatorColor:(UIColor *)separatorColor
{
    _separatorColor = separatorColor;

    [self.tableView setSeparatorColor: separatorColor];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
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
    }
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
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

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)
- (void)setTableViewStyle:(UITableViewStyle)tableViewStyle {
    _tableViewStyle = tableViewStyle;
    
    [self createTableView];
}

- (void)setContentInset:(UIEdgeInsets)insets {
    _contentInset = insets;
    _tableView.contentInset = insets;
}

- (void)setContentOffset:(CGPoint)offset {
    _contentOffset = offset;
    _tableView.contentOffset = offset;
}

- (void)setScrollIndicatorInsets:(UIEdgeInsets)insets {
    _scrollIndicatorInsets = insets;
    _tableView.scrollIndicatorInsets = insets;
}

#pragma mark -

- (void)layoutSubviews {
    [self.tableView setFrame:self.frame];
    
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
#pragma mark TableView APIs

- (void)createTableView {
    _tableView = [[RNCustomTableView alloc] initWithFrame:CGRectZero style:_tableViewStyle];
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

#pragma mark UITableViewDelegate

- (void)tableView:(UITableView *)tableView willDisplayFooterView:(nonnull UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *footer = (UITableViewHeaderFooterView *)view;
    
    if (self.footerTextColor){
        footer.textLabel.textColor = self.footerTextColor;
    }
    if (self.footerFont){
        footer.textLabel.font = self.footerFont;
    }
}


-(void)setHeaderHeight:(float)headerHeight {
    _headerHeight = headerHeight;
}
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

- (void)tableView:(UITableView *)tableView willDisplayHeaderView:(UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *header = (UITableViewHeaderFooterView *)view;
    
    if (self.headerTextColor){
        header.textLabel.textColor = self.headerTextColor;
    }
    if (self.headerFont){
        header.textLabel.font = self.headerFont;
    }
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
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

#pragma mark UITableViewDataSource

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [_eventDispatcher sendInputEventWithName:@"onEndDisplayingCell" body:@{@"target":self.reactTag, @"row":@(indexPath.row), @"section": @(indexPath.section)}];
}


- (void)setSections:(NSArray *)sections
{
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    
    // create selected indexes
    _selectedIndexes = [NSMutableArray arrayWithCapacity:[sections count]];
    
    BOOL found = NO;
    for (NSDictionary *section in sections){
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
            if ((itemData[@"selected"] && [itemData[@"selected"] intValue]) || (self.selectedValue && [self.selectedValue isEqual:item[@"value"]])){
                if(selectedIndex == -1)
                    selectedIndex = [items count];
                itemData[@"selected"] = @YES;
                found = YES;
            }
            [items addObject:itemData];
        }
        [_selectedIndexes addObject:[NSNumber numberWithUnsignedInteger:selectedIndex]];
        
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
    [self.tableView reloadData];
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [_sections count];
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
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

-(UITableViewCell*)setupReactModuleCell:(UITableView *)tableView data:(NSDictionary*)data indexPath:(NSIndexPath *)indexPath {
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

-(UITableViewCell* )tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
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

-(NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return _sections[section][@"label"];
}

-(NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section {
    return _sections[section][@"footerLabel"];
}

-(NSMutableDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section {
    return (NSMutableDictionary *)_sections[section][@"items"][row];
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (![self hasCustomCells:indexPath.section]){
        NSNumber *styleHeight = _sections[indexPath.section][@"items"][indexPath.row][@"height"];
        return styleHeight.floatValue ?: _cellHeight;
    } else {
        RNCellView *cell = (RNCellView *)_cells[indexPath.section][indexPath.row];
        CGFloat height =  cell.componentHeight;
        return height;
    }
    
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

#pragma mark Move

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

#pragma mark Edit

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

-(UITableViewCellEditingStyle)tableView:(UITableView *)tableView
          editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath{
    return self.tableViewCellEditingStyle;
}

-(BOOL)tableView:(UITableView *)tableView shouldIndentWhileEditingRowAtIndexPath:(NSIndexPath *)indexPath{
    if (self.tableViewCellEditingStyle == UITableViewCellEditingStyleNone) {
        return NO;
    }
    return YES;
}

-(BOOL)hasCustomCells:(NSInteger)section {
    return [[_sections[section] valueForKey:@"customCells"] boolValue];
}


@end





#pragma mark -
#pragma mark ScrollView APIs


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


@implementation RNTableView (RCTScrollView)

- (void)setRemoveClippedSubviews:(__unused BOOL)removeClippedSubviews
{
    // Does nothing
}

//- (void)insertReactSubview:(UIView *)view atIndex:(__unused NSInteger)atIndex
//{
//    if ([view isKindOfClass:[RCTRefreshControl class]]) {
//        _tableView.refreshControl = (RCTRefreshControl*)view;
//    } else {
//        RCTAssert(_contentView == nil, @"RNTableView may only contain a single subview");
//        _contentView = view;
//        [_tableView addSubview:view];
//    }
//}

//- (void)removeReactSubview:(UIView *)subview
//{
//    if ([subview isKindOfClass:[RCTRefreshControl class]]) {
//        _tableView.refreshControl = nil;
//    } else {
//        RCTAssert(_contentView == subview, @"Attempted to remove non-existent subview");
//        _contentView = nil;
//        [subview removeFromSuperview];
//    }
//}

//- (NSArray<UIView *> *)reactSubviews
//{
//    if (_contentView && _tableView.refreshControl) {
//        return @[_contentView, _tableView.refreshControl];
//    }
//    return _contentView ? @[_contentView] : @[];
//}

- (BOOL)centerContent
{
    return _tableView.centerContent;
}

- (void)setCenterContent:(BOOL)centerContent
{
    _tableView.centerContent = centerContent;
}

- (NSIndexSet *)stickyHeaderIndices
{
    return _tableView.stickyHeaderIndices;
}

- (void)setStickyHeaderIndices:(NSIndexSet *)headerIndices
{
    RCTAssert(_tableView.contentSize.width <= self.frame.size.width,
              @"sticky headers are not supported with horizontal scrolled views");
    _tableView.stickyHeaderIndices = headerIndices;
}

- (void)setClipsToBounds:(BOOL)clipsToBounds
{
    super.clipsToBounds = clipsToBounds;
    _tableView.clipsToBounds = clipsToBounds;
}

- (void)dealloc
{
    _tableView.delegate = nil;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    RCTAssert(self.subviews.count == 1, @"we should only have exactly one subview");
    RCTAssert([self.subviews lastObject] == _tableView, @"our only subview should be a scrollview");
    
    CGPoint originalOffset = _tableView.contentOffset;
    _tableView.frame = self.bounds;
    _tableView.contentOffset = originalOffset;
    
    [self updateClippedSubviews];
}

- (void)updateClippedSubviews
{
    // Find a suitable view to use for clipping
    UIView *clipView = [self react_findClipView];
    if (!clipView) {
        return;
    }
    
    static const CGFloat leeway = 1.0;
    
    const CGSize contentSize = _tableView.contentSize;
    const CGRect bounds = _tableView.bounds;
    const BOOL scrollsHorizontally = contentSize.width > bounds.size.width;
    const BOOL scrollsVertically = contentSize.height > bounds.size.height;
    
    const BOOL shouldClipAgain =
    CGRectIsNull(_lastClippedToRect) ||
    (scrollsHorizontally && (bounds.size.width < leeway || fabs(_lastClippedToRect.origin.x - bounds.origin.x) >= leeway)) ||
    (scrollsVertically && (bounds.size.height < leeway || fabs(_lastClippedToRect.origin.y - bounds.origin.y) >= leeway));
    
    if (shouldClipAgain) {
        const CGRect clipRect = CGRectInset(clipView.bounds, -leeway, -leeway);
        [self react_updateClippedSubviewsWithClipRect:clipRect relativeToView:clipView];
        _lastClippedToRect = bounds;
    }
}

- (void)setContentInset:(UIEdgeInsets)contentInset
{
    CGPoint contentOffset = _tableView.contentOffset;
    
    _contentInset = contentInset;
    [RCTView autoAdjustInsetsForView:self
                      withScrollView:_tableView
                        updateOffset:NO];
    
    _tableView.contentOffset = contentOffset;
}

- (void)scrollToOffset:(CGPoint)offset
{
    [self scrollToOffset:offset animated:YES];
}

- (void)scrollToOffset:(CGPoint)offset animated:(BOOL)animated
{
    if (!CGPointEqualToPoint(_tableView.contentOffset, offset)) {
        [_tableView setContentOffset:offset animated:animated];
    }
}

- (void)zoomToRect:(CGRect)rect animated:(BOOL)animated
{
    [_tableView zoomToRect:rect animated:animated];
}

- (void)refreshContentInset
{
    [RCTView autoAdjustInsetsForView:self
                      withScrollView:_tableView
                        updateOffset:YES];
}

#pragma mark - ScrollView delegate

#define RCT_SCROLL_EVENT_HANDLER(delegateMethod, eventName) \
- (void)delegateMethod:(UIScrollView *)scrollView           \
{                                                           \
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

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
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
        
        // Calculate changed frames
        NSArray<NSDictionary *> *childFrames = [self calculateChildFramesData];
        
        // Dispatch event
        [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeMove
                                         reactTag:self.reactTag
                                       scrollView:scrollView
                                         userData:@{@"updatedChildFrames": childFrames}];
        
        // Update dispatch time
        _lastScrollDispatchTime = now;
        _allowNextScrollNoMatterWhat = NO;
    }
    RCT_FORWARD_SCROLL_EVENT(scrollViewDidScroll:scrollView);
}

- (NSArray<NSDictionary *> *)calculateChildFramesData
{
    NSMutableArray<NSDictionary *> *updatedChildFrames = [NSMutableArray new];
//    [[_contentView reactSubviews] enumerateObjectsUsingBlock:
//     ^(UIView *subview, NSUInteger idx, __unused BOOL *stop) {
//         
//         // Check if new or changed
//         CGRect newFrame = subview.frame;
//         BOOL frameChanged = NO;
//         if (_cachedChildFrames.count <= idx) {
//             frameChanged = YES;
//             [_cachedChildFrames addObject:[NSValue valueWithCGRect:newFrame]];
//         } else if (!CGRectEqualToRect(newFrame, [_cachedChildFrames[idx] CGRectValue])) {
//             frameChanged = YES;
//             _cachedChildFrames[idx] = [NSValue valueWithCGRect:newFrame];
//         }
//         
//         // Create JS frame object
//         if (frameChanged) {
//             [updatedChildFrames addObject: @{
//                                              @"index": @(idx),
//                                              @"x": @(newFrame.origin.x),
//                                              @"y": @(newFrame.origin.y),
//                                              @"width": @(newFrame.size.width),
//                                              @"height": @(newFrame.size.height),
//                                              }];
//         }
//     }];
    
    return updatedChildFrames;
}

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    _allowNextScrollNoMatterWhat = YES; // Ensure next scroll event is recorded, regardless of throttle
    [_eventDispatcher sendScrollEventWithType:RCTScrollEventTypeStart reactTag:self.reactTag scrollView:scrollView userData:nil];
    RCT_FORWARD_SCROLL_EVENT(scrollViewWillBeginDragging:scrollView);
}

- (void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset
{
    
    
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

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
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

#pragma mark - Setters

- (CGSize)_calculateViewportSize
{
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
- (CGSize)contentSize
{
    return _tableView.contentSize;
//    if (!CGSizeEqualToSize(_contentSize, CGSizeZero)) {
//        return _contentSize;
//    } else if (!_contentView) {
//        return CGSizeZero;
//    } else {
//        CGSize singleSubviewSize = _contentView.frame.size;
//        CGPoint singleSubviewPosition = _contentView.frame.origin;
//        return (CGSize){
//            singleSubviewSize.width + singleSubviewPosition.x,
//            singleSubviewSize.height + singleSubviewPosition.y
//        };
//    }
}

- (void)reactBridgeDidFinishTransaction
{
    CGSize contentSize = self.contentSize;
    if (!CGSizeEqualToSize(_tableView.contentSize, contentSize)) {
        // When contentSize is set manually, ScrollView internals will reset
        // contentOffset to  {0, 0}. Since we potentially set contentSize whenever
        // anything in the ScrollView updates, we workaround this issue by manually
        // adjusting contentOffset whenever this happens
        CGPoint newOffset = [self calculateOffsetForContentSize:contentSize];
        _tableView.contentSize = contentSize;
        _tableView.contentOffset = newOffset;
    }
//    [_tableView dockClosestSectionHeader];
}

// Note: setting several properties of UIScrollView has the effect of
// resetting its contentOffset to {0, 0}. To prevent this, we generate
// setters here that will record the contentOffset beforehand, and
// restore it after the property has been set.

#define RCT_SET_AND_PRESERVE_OFFSET(setter, type)    \
- (void)setter:(type)value                           \
{                                                    \
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

- (BOOL)respondsToSelector:(SEL)aSelector
{
    return [super respondsToSelector:aSelector] || [_tableView respondsToSelector:aSelector];
}

- (void)setValue:(id)value forUndefinedKey:(NSString *)key
{
    [_tableView setValue:value forKey:key];
}

- (id)valueForUndefinedKey:(NSString *)key
{
    return [_tableView valueForKey:key];
}

- (void)setOnRefreshStart:(RCTDirectEventBlock)onRefreshStart
{
    if (!onRefreshStart) {
        _onRefreshStart = nil;
        _tableView.refreshControl = nil;
        return;
    }
    _onRefreshStart = [onRefreshStart copy];
    
    if (!_tableView.refreshControl) {
        UIRefreshControl *refreshControl = [[UIRefreshControl alloc] init];
        [refreshControl addTarget:self action:@selector(refreshControlValueChanged) forControlEvents:UIControlEventValueChanged];
        _tableView.refreshControl = refreshControl;
    }
}

- (void)refreshControlValueChanged
{
    if (self.onRefreshStart) {
        self.onRefreshStart(nil);
    }
}

- (void)endRefreshing
{
    [_tableView.refreshControl endRefreshing];
}

@end












