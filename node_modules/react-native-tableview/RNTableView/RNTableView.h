//
//  SVGUse.h
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RCTAutoInsetsProtocol.h"
#import "RCTEventDispatcher.h"
#import "RCTScrollableProtocol.h"
#import "RCTView.h"

@class RCTEventDispatcher;

@protocol RNTableViewDatasource <NSObject>

// create method with params dictionary
-(id)initWithDictionary:(NSDictionary *)params ;

// array of NSDictionary objects (sections) passed to RCTTableViewDatasource (each section should contain "items" value as NSArray of inner items (NSDictionary)
-(NSArray *)sections;

@end

@interface RNTableView : RCTView
<UITableViewDataSource,
UITableViewDelegate,
RCTScrollableProtocol,
RCTAutoInsetsProtocol
>

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic, readonly) UITableView *tableView;

@property (nonatomic, copy) NSMutableArray *sections;
@property (nonatomic, copy) NSArray *additionalItems;
@property (nonatomic, strong) NSString *json;
@property (nonatomic, strong) NSString *filter;
@property (nonatomic, strong) NSArray *filterArgs;
@property (nonatomic, strong) id selectedValue;

@property (nonatomic) float cellHeight;
@property (nonatomic) float footerHeight;
@property (nonatomic) float headerHeight;

@property (nonatomic) BOOL customCells;
@property (nonatomic) BOOL editing;
@property (nonatomic) BOOL emptyInsets;
@property (nonatomic) BOOL moveWithinSectionOnly;
//@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) CGPoint contentOffset;
@property (nonatomic, assign) UIEdgeInsets scrollIndicatorInsets;

@property (nonatomic, assign) UITableViewStyle tableViewStyle;
@property (nonatomic, assign) UITableViewCellStyle tableViewCellStyle;
@property (nonatomic, assign) UITableViewCellEditingStyle tableViewCellEditingStyle;
@property (nonatomic, assign) UITableViewCellSeparatorStyle separatorStyle;
@property (nonatomic, strong) UIFont *font;
@property (nonatomic, strong) UIFont *headerFont;
@property (nonatomic, strong) UIColor *headerTextColor;
@property (nonatomic, strong) UIFont *footerFont;
@property (nonatomic, strong) UIColor *footerTextColor;

@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, strong) UIColor *tintColor;
@property (nonatomic, strong) UIColor *selectedTextColor;
@property (nonatomic, strong) UIColor *detailTextColor;
@property (nonatomic, strong) UIColor *separatorColor;
@property (nonatomic) BOOL autoFocus;
@property (nonatomic) BOOL allowsToggle;
@property (nonatomic) BOOL allowsMultipleSelection;
@property (nonatomic) NSString *reactModuleForCell;

#pragma mark - RCTScrollView properties & methods

/**
 *  @name RCTScrollView properties & methods
 *
 */

/**
 * The `RCTScrollView` may have at most one single subview. This will ensure
 * that the scroll view's `contentSize` will be efficiently set to the size of
 * the single subview's frame. That frame size will be determined somewhat
 * efficiently since it will have already been computed by the off-main-thread
 * layout system.
 */
//@property (nonatomic, readonly) UIView *contentView;

/**
 * If the `contentSize` is not specified (or is specified as {0, 0}, then the
 * `contentSize` will automatically be determined by the size of the subview.
 */
//@property (nonatomic, assign) CGSize contentSize;

/**
 * The underlying scrollView (TODO: can we remove this?)
 */
//@property (nonatomic, readonly) UIScrollView *scrollView;

@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) BOOL automaticallyAdjustContentInsets;
@property (nonatomic, assign) NSTimeInterval scrollEventThrottle;

- (void)endRefreshing;

@end
