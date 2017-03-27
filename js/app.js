angular.module('scfc', [])
    .controller('ScfcController', ['$scope', function($scope) {
        $scope.scfc = {
            colorA: '#BADA55',
            colorB: '#B0BCA7',
            colorDiff: function(a,b) {
                var a = tinycolor(a).toHsl(),
                        b = tinycolor(b).toHsl(),
  
                        sat = a.s - b.s,
                        lig = a.l - b.l,
                        hue = -(a.h - b.h),
  
                        fnSat = (sat > 0) ? 'desaturate' : 'saturate',
                        fnLig = (lig > 0) ? 'darken' : 'lighten';
  
                sat = Math.abs(sat) * 100;
                lig = Math.abs(lig) * 100;
  
                return {
                    baseColor: '#' + tinycolor(a).toHex(),
                    fnHue : 'adjust-hue',
                    hue : hue.toFixed(0),
                    fnSat : fnSat,
                    sat : sat.toFixed(0),
                    fnLig : fnLig,
                    lig: lig.toFixed(0)
                }
            },
            adjustmentStringConstuctor: function(diff) {
                var addToString = function(diffVal, diffFn, transformString) {
                    if (diffVal != 0) {
                        return diffFn + '(' + transformString + ', ' + diffVal + ')';
                    } else {
                        return transformString;
                    }
                }

                var t = diff.baseColor;
                t = addToString(diff.hue, diff.fnHue, t);
                t = addToString(diff.sat, diff.fnSat, t);
                t = addToString(diff.lig, diff.fnLig, t);

                return t;
            },
            adjustmentString: function() {
                if ( !( tinycolor($scope.scfc.colorA).isValid() && tinycolor($scope.scfc.colorB).isValid() ) )
                        return 'Please enter two valid colours';
                var adjustments = $scope.scfc.colorDiff($scope.scfc.colorA, $scope.scfc.colorB);
                return $scope.scfc.adjustmentStringConstuctor(adjustments);
            }
        };
    }]);