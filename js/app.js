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
                    sat : sat.toFixed(2),
                    fnLig : fnLig,
                    lig: lig.toFixed(2)
                }
            },
            adjustmentStringConstuctor: function(diff) {
                var addTransformToString = function(diffVal, diffFn, transformString) {
                    if (diffVal != 0)
                        return diffFn + '(' + transformString + ', ' + diffVal + ')';
                    
                    return transformString;
                }

                var transformString = diff.baseColor;

                transformString = addTransformToString(diff.hue, diff.fnHue, transformString);
                transformString = addTransformToString(diff.sat, diff.fnSat, transformString);
                transformString = addTransformToString(diff.lig, diff.fnLig, transformString);

                if (transformString === diff.baseColor)
                    return "Colours are too similar, pal!";

                return transformString;
            },
            adjustmentString: function() {
                if ( !( tinycolor($scope.scfc.colorA).isValid() && tinycolor($scope.scfc.colorB).isValid() ) )
                    return 'Please enter two valid colours';
                
                var adjustments = $scope.scfc.colorDiff($scope.scfc.colorA, $scope.scfc.colorB);
                return $scope.scfc.adjustmentStringConstuctor(adjustments);
            }
        };
    }]);