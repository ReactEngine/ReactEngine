//
//  RCTTableViewManager.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 18.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableViewManager.h"
#import "RNTableView.h"
#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTUIManager.h"
#import "RCTScrollableProtocol.h"
#import "RCTConvert+UITableView.h"

@interface RNTableView (Private)

- (NSArray<NSDictionary *> *)calculateChildFramesData;

@end

@implementation RNTableViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNTableView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

#pragma mark -
#pragma mark TableView Event Types

- (NSArray *)customDirectEventTypes
{
    return @[/* Scroll View Events */
             @"scrollBeginDrag",
             @"scroll",
             @"scrollEndDrag",
             @"scrollAnimationEnd",
             @"momentumScrollBegin",
             @"momentumScrollEnd",
             /* Table View Events */
             @"onWillDisplayCell",
             @"onEndDisplayingCell",
             @"onItemNotification",
             ];
}

#pragma mark -
#pragma mark Data Source

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)
RCT_EXPORT_VIEW_PROPERTY(json, NSString)

RCT_EXPORT_VIEW_PROPERTY(filter, NSString)
RCT_EXPORT_VIEW_PROPERTY(filterArgs, NSArray)

RCT_EXPORT_VIEW_PROPERTY(additionalItems, NSArray)

#pragma mark -
#pragma mark Table View Properties

RCT_EXPORT_VIEW_PROPERTY(tableViewStyle, UITableViewStyle)

RCT_EXPORT_VIEW_PROPERTY(autoFocus, BOOL)
RCT_EXPORT_VIEW_PROPERTY(emptyInsets, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(fontSize, CGFloat, RNTableView) {
    view.font = [RCTConvert UIFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, RNTableView) {
    view.font = [RCTConvert UIFont:view.font withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, RNTableView) {
    view.font = [RCTConvert UIFont:view.font withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, RNTableView) {
    view.font = [RCTConvert UIFont:view.font withFamily:json ?: defaultView.font.familyName];
}

#pragma mark -
#pragma mark Header

RCT_EXPORT_VIEW_PROPERTY(headerHeight, float)

RCT_CUSTOM_VIEW_PROPERTY(headerFontSize, CGFloat, RNTableView) {
    view.headerFont = [RCTConvert UIFont:view.headerFont withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontWeight, NSString, RNTableView) {
    view.headerFont = [RCTConvert UIFont:view.headerFont withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontStyle, NSString, RNTableView) {
    view.headerFont = [RCTConvert UIFont:view.headerFont withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontFamily, NSString, RNTableView) {
    view.headerFont = [RCTConvert UIFont:view.headerFont withFamily:json ?: defaultView.font.familyName];
}

#pragma mark -
#pragma mark Footer

RCT_EXPORT_VIEW_PROPERTY(footerHeight, float)

RCT_CUSTOM_VIEW_PROPERTY(footerFontSize, CGFloat, RNTableView) {
    view.footerFont = [RCTConvert UIFont:view.footerFont withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontWeight, NSString, RNTableView) {
    view.footerFont = [RCTConvert UIFont:view.footerFont withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontStyle, NSString, RNTableView) {
    view.footerFont = [RCTConvert UIFont:view.footerFont withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontFamily, NSString, RNTableView) {
    view.footerFont = [RCTConvert UIFont:view.footerFont withFamily:json ?: defaultView.font.familyName];
}


#pragma mark -
#pragma mark Cell

RCT_EXPORT_VIEW_PROPERTY(tableViewCellStyle, UITableViewCellStyle)
/*Each cell is a separate app, multiple cells share the app/module name*/
RCT_CUSTOM_VIEW_PROPERTY(reactModuleForCell, NSString*, RNTableView) {
    [view setReactModuleForCell:[RCTConvert NSString:json]];
}

RCT_EXPORT_VIEW_PROPERTY(cellForRowAtIndexPath, NSArray)

RCT_EXPORT_VIEW_PROPERTY(cellHeight, float)

RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(detailTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(allowsToggle, BOOL)

RCT_EXPORT_VIEW_PROPERTY(allowsMultipleSelection, BOOL)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(selectedSection, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(selectedValue, id)
RCT_EXPORT_VIEW_PROPERTY(selectedTextColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(moveWithinSectionOnly, BOOL)

#pragma mark -
#pragma mark Editing

RCT_EXPORT_VIEW_PROPERTY(editing, BOOL)

RCT_EXPORT_VIEW_PROPERTY(tableViewCellEditingStyle, UITableViewCellEditingStyle)

#pragma mark -
#pragma mark Separator

RCT_EXPORT_VIEW_PROPERTY(separatorColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(separatorStyle, UITableViewCellSeparatorStyle)

#pragma mark -
#pragma mark Notification

RCT_EXPORT_METHOD(sendNotification:(NSDictionary *)data)
{
    [self.bridge.eventDispatcher sendInputEventWithName:@"onItemNotification" body:data];
}

#pragma mark -
#pragma mark ScrollView Properties

RCT_EXPORT_VIEW_PROPERTY(alwaysBounceHorizontal, BOOL)
RCT_EXPORT_VIEW_PROPERTY(alwaysBounceVertical, BOOL)
RCT_EXPORT_VIEW_PROPERTY(bounces, BOOL)
RCT_EXPORT_VIEW_PROPERTY(bouncesZoom, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canCancelContentTouches, BOOL)
RCT_EXPORT_VIEW_PROPERTY(centerContent, BOOL)
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustContentInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(decelerationRate, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(directionalLockEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(keyboardDismissMode, UIScrollViewKeyboardDismissMode)
RCT_EXPORT_VIEW_PROPERTY(maximumZoomScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minimumZoomScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(pagingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollsToTop, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsHorizontalScrollIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsVerticalScrollIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(stickyHeaderIndices, NSIndexSet)
RCT_EXPORT_VIEW_PROPERTY(scrollEventThrottle, NSTimeInterval)
RCT_EXPORT_VIEW_PROPERTY(zoomScale, CGFloat)

RCT_CUSTOM_VIEW_PROPERTY(contentInset, UIEdgeInsets, RNTableView) {
    [view setContentInset:[RCTConvert UIEdgeInsets:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(scrollIndicatorInsets, UIEdgeInsets, RNTableView) {
    [view setScrollIndicatorInsets:[RCTConvert UIEdgeInsets:json]];
}
RCT_EXPORT_VIEW_PROPERTY(snapToInterval, int)
RCT_EXPORT_VIEW_PROPERTY(snapToAlignment, NSString)

RCT_CUSTOM_VIEW_PROPERTY(contentOffset, CGPoint, RNTableView) {
    [view setContentOffset:[RCTConvert CGPoint:json]];
}
RCT_EXPORT_VIEW_PROPERTY(onRefreshStart, RCTDirectEventBlock)

// Use ScrollView.Constants.DecelerationRate
//- (NSDictionary<NSString *, id> *)constantsToExport
//{
//    return @{
//             @"DecelerationRate": @{
//                     @"normal": @(UIScrollViewDecelerationRateNormal),
//                     @"fast": @(UIScrollViewDecelerationRateFast),
//                     },
//             };
//}

RCT_EXPORT_METHOD(getContentSize:(nonnull NSNumber *)reactTag
                  callback:(RCTResponseSenderBlock)callback)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNTableView *> *viewRegistry) {
         
         RNTableView *view = viewRegistry[reactTag];
         if (!view || ![view isKindOfClass:[RNTableView class]]) {
             RCTLogError(@"Cannot find RNTableView with tag #%@", reactTag);
             return;
         }
         
         CGSize size = view.tableView.contentSize;
         callback(@[@{
                        @"width" : @(size.width),
                        @"height" : @(size.height)
                        }]);
     }];
}

RCT_EXPORT_METHOD(calculateChildFrames:(nonnull NSNumber *)reactTag
                  callback:(RCTResponseSenderBlock)callback)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNTableView *> *viewRegistry) {
         
         RNTableView *view = viewRegistry[reactTag];
         if (!view || ![view isKindOfClass:[RNTableView class]]) {
             RCTLogError(@"Cannot find RNTableView with tag #%@", reactTag);
             return;
         }
         
         NSArray<NSDictionary *> *childFrames = [view calculateChildFramesData];
         if (childFrames) {
             callback(@[childFrames]);
         }
     }];
}

RCT_EXPORT_METHOD(endRefreshing:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNTableView *> *viewRegistry) {
         
         RNTableView *view = viewRegistry[reactTag];
         if (!view || ![view isKindOfClass:[RNTableView class]]) {
             RCTLogError(@"Cannot find RNTableView with tag #%@", reactTag);
             return;
         }
         
         [view endRefreshing];
     }];
}

RCT_EXPORT_METHOD(scrollTo:(nonnull NSNumber *)reactTag
                  x:(CGFloat)x
                  y:(CGFloat)y
                  animated:(BOOL)animated)
{
    CGPoint offset = CGPointMake(x, y);
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
         UIView *view = viewRegistry[reactTag];
         if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)]) {
             [(id<RCTScrollableProtocol>)view scrollToOffset:offset animated:animated];
         } else {
             RCTLogError(@"tried to scrollTo: on non-RCTScrollableProtocol view %@ "
                         "with tag #%@", view, reactTag);
         }
     }];
}

RCT_EXPORT_METHOD(zoomToRect:(nonnull NSNumber *)reactTag
                  withRect:(CGRect)rect
                  animated:(BOOL)animated)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
         UIView *view = viewRegistry[reactTag];
         if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)]) {
             [(id<RCTScrollableProtocol>)view zoomToRect:rect animated:animated];
         } else {
             RCTLogError(@"tried to zoomToRect: on non-RCTScrollableProtocol view %@ "
                         "with tag #%@", view, reactTag);
         }
     }];
}

@end
