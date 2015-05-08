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
    			hue : hue,
    			fnSat : fnSat,
    			sat : sat,
    			fnLig : fnLig,
    			lig: lig
    		}
    	},
    	constructAdjustmentString: function(diff) {
    		var t1 = diff.fnHue + '(' + diff.baseColor + ', ' + diff.hue + ')',
    				t2 = diff.fnSat  + '(' + t1 + ', ' + diff.sat + ')',
    				t3 = diff.fnLig  + '(' + t2 + ', ' + diff.lig + ')';

    		return t3;
    	},
    	adjustmentString: function() {
    		var adjustments = $scope.scfc.colorDiff($scope.scfc.colorA, $scope.scfc.colorB);
    		return $scope.scfc.constructAdjustmentString(adjustments);
    	}
    };
  }]);