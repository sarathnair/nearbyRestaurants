steal(
    'can',
    './restaurant-list-item.stache!',
    './restaurant-list-item.less!',
    function(Can, InitView){
        return can.Component.extend({
            tag: "ms-restaurant-list-item",
            template: InitView,
            viewModel: Can.Map.extend({
                define: {
                    
                }          
            }),
            events: {
               '.list-group-item click': function(){
                    $('ms-content').viewModel().attr('selectedRestaurant', this.viewModel.attr('item'));    
                }  
            }
        });
    }
)