steal(
    'can',
    './content.stache!',
    './content.less!',
    '../restaurant-list-item/restaurant-list-item.js',
    function(Can, InitView){
        return can.Component.extend({
            tag: "ms-content",
            template: InitView,
            viewModel: Can.Map.extend({
                define: {
                    restaurants: {
                        value: new Can.List([])
                    },
                    restaurantsView: {
                        value: true
                    },
                    selectedRestaurant: {
                        set: function(newVal){
                            if(newVal && newVal.attr('name')){
                                this.attr('restaurantsView', false);
                            }
                            return newVal;
                        }
                    }
                }                
            }),
            events: {
                inserted: function(){
                    var scope = this;
                    var map;
                    var service;
                    var infowindow;
                    
                    var pyrmont = new google.maps.LatLng(this.viewModel.attr('location').latitude,this.viewModel.attr('location').longitude);

                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 15
                        });

                    var request = {
                        location: pyrmont,
                        radius: '5000',
                        types: ['restaurant']
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);

                    function callback(results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            for (var i = 0; i < results.length; i++) {
                                var place = new Can.Map(results[i]);
                                scope.viewModel.attr('restaurants').push(place);
                            }
                        }
                    }
                },
                '#btnGoBack click': function(){
                    this.viewModel.attr('restaurantsView', true);
                }
            }
        });
    }
)