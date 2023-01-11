/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconJindu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M516.266667 341.333333c-106.666667 0-192 85.333333-192 192s85.333333 192 192 192c38.4 0 72.533333-12.8 102.4-29.866666l85.333333 93.866666c4.266667 8.533333 17.066667 8.533333 25.6 8.533334 8.533333 0 17.066667-4.266667 21.333333-8.533334 12.8-12.8 12.8-34.133333 4.266667-46.933333l-85.333333-93.866667c25.6-34.133333 42.666667-72.533333 42.666666-119.466666C708.266667 426.666667 618.666667 341.333333 516.266667 341.333333z m486.4 192c0-89.6-25.6-174.933333-64-247.466666-42.666667-76.8-106.666667-136.533333-179.2-179.2l-68.266667 115.2c55.466667 34.133333 98.133333 76.8 128 132.266666 29.866667 51.2 46.933333 115.2 46.933333 179.2 0 51.2-8.533333 98.133333-29.866666 140.8l-25.6-17.066666 12.8 166.4 170.666666-59.733334-38.4-21.333333c29.866667-64 46.933333-136.533333 46.933334-209.066667zM204.8 354.133333c29.866667-55.466667 72.533333-98.133333 128-128 42.666667-25.6 85.333333-38.4 136.533333-46.933333V213.333333l136.533334-93.866666L469.333333 0v46.933333c-72.533333 4.266667-140.8 25.6-204.8 59.733334C192 149.333333 128 213.333333 85.333333 290.133333 42.666667 362.666667 21.333333 443.733333 21.333333 537.6h132.266667c0-68.266667 17.066667-132.266667 51.2-183.466667zM512 891.733333c-64 0-128-17.066667-179.2-46.933333-42.666667-25.6-76.8-55.466667-106.666667-93.866667l29.866667-21.333333-149.333333-72.533333-34.133334 179.2 38.4-21.333334c42.666667 59.733333 93.866667 106.666667 153.6 145.066667 72.533333 42.666667 157.866667 64 247.466667 64s174.933333-25.6 247.466667-64l-68.266667-115.2c-51.2 29.866667-115.2 46.933333-179.2 46.933333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconJindu.defaultProps = {
  size: 18,
};

IconJindu = React.memo ? React.memo(IconJindu) : IconJindu;

export default IconJindu;