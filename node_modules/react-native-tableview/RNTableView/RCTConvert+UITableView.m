//
//  RCTConvert (UITableView).m
//  RNTableView
//
//  Created by Sun Jin on 4/15/16.
//  Copyright © 2016 Pavlo Aksonov. All rights reserved.
//

#import "RCTConvert+UITableView.h"

@implementation RCTConvert (UITableView)

RCT_ENUM_CONVERTER(UITableViewStyle,
                   (@{@"plain": @(UITableViewStylePlain),
                      @"grouped": @(UITableViewStyleGrouped)
                      }),
                   UITableViewStylePlain,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewScrollPosition,
                   (@{@"none": @(UITableViewScrollPositionNone),
                      @"top": @(UITableViewScrollPositionTop),
                      @"middle": @(UITableViewScrollPositionMiddle),
                      @"bottom": @(UITableViewScrollPositionBottom)
                      }),
                   UITableViewScrollPositionNone,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewRowAnimation,
                   (@{@"fade": @(UITableViewRowAnimationFade),
                      @"right": @(UITableViewRowAnimationRight),
                      @"left": @(UITableViewRowAnimationRight),
                      @"top": @(UITableViewRowAnimationRight),
                      @"bottom": @(UITableViewRowAnimationRight),
                      @"none": @(UITableViewRowAnimationRight),
                      @"middle": @(UITableViewRowAnimationRight),
                      @"automatic": @(UITableViewRowAnimationRight)
                      }),
                   UITableViewRowAnimationFade,
                   integerValue)

#if __IPHONE_OS_VERSION_MIN_REQUIRED >= __IPHONE_8_0
RCT_ENUM_CONVERTER(UITableViewRowActionStyle,
                   (@{@"destructive":@(UITableViewRowActionStyleDestructive),
                      @"normal": @(UITableViewRowActionStyleNormal)
                      }),
                   UITableViewRowActionStyleDestructive,
                   integerValue)
#endif

RCT_ENUM_CONVERTER(UITableViewCellStyle,
                   (@{@"default": @(UITableViewCellStyleDefault),
                      @"value1": @(UITableViewCellStyleValue1),
                      @"value2": @(UITableViewCellStyleValue2),
                      @"subtitle": @(UITableViewCellStyleSubtitle)
                      }),
                   UITableViewCellStyleDefault,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewCellEditingStyle,
                   (@{@"none": @(UITableViewCellEditingStyleNone),
                      @"delete": @(UITableViewCellEditingStyleDelete),
                      @"insert": @(UITableViewCellEditingStyleInsert)
                      }),
                   UITableViewCellEditingStyleNone,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewCellSelectionStyle,
                   (@{@"none": @(UITableViewCellSelectionStyleNone),
                      @"blue": @(UITableViewCellSelectionStyleBlue),
                      @"gray": @(UITableViewCellSelectionStyleGray),
                      @"default": @(UITableViewCellSelectionStyleDefault)
                      }),
                   UITableViewCellSelectionStyleDefault,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewCellSeparatorStyle,
                   (@{@"none": @(UITableViewCellSeparatorStyleNone),
                      @"singleLine": @(UITableViewCellSeparatorStyleSingleLine),
                      @"singleLineEtched": @(UITableViewCellSeparatorStyleSingleLineEtched)
                      }),
                   UITableViewCellSeparatorStyleSingleLine,
                   integerValue)

RCT_ENUM_CONVERTER(UITableViewCellAccessoryType,
                   (@{@"none": @(UITableViewCellAccessoryNone),
                      @"disclosureIndicator": @(UITableViewCellAccessoryDisclosureIndicator),
                      @"detailDisclosureButton": @(UITableViewCellAccessoryDetailDisclosureButton),
                      @"checkmark": @(UITableViewCellAccessoryCheckmark),
                      @"detailButton": @(UITableViewCellAccessoryDetailButton)
                      }),
                   UITableViewCellAccessoryNone,
                   integerValue)

@end
