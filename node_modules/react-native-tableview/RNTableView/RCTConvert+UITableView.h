//
//  RCTConvert (UITableView).h
//  RNTableView
//
//  Created by Sun Jin on 4/15/16.
//  Copyright © 2016 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTConvert.h"

@interface RCTConvert (UITableView)

+ (UITableViewStyle)UITableViewStyle:(id)json;

+ (UITableViewScrollPosition)UITableViewScrollPosition:(id)json;

+ (UITableViewRowAnimation)UITableViewRowAnimation:(id)json;

#if __IPHONE_OS_VERSION_MIN_REQUIRED >= __IPHONE_8_0
+ (UITableViewRowActionStyle)UITableViewRowActionStyle:(id)json;
#endif

+ (UITableViewCellStyle)UITableViewCellStyle:(id)json;

+ (UITableViewCellSelectionStyle)UITableViewCellSelectionStyle:(id)json;

+ (UITableViewCellSeparatorStyle)UITableViewCellSeparatorStyle:(id)json;

+ (UITableViewCellAccessoryType)UITableViewCellAccessoryType:(id)json;

@end
