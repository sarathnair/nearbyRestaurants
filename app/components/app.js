steal(
    'can',
    './app.stache!',
    '../../resources/js/bootstrap.min.js',
    '../../resources/css/bootstrap.min.css',
    './app.less!',
    './content/content.js',
    function(Can, InitView){
        var data = new Can.Map({
            title: 'Nearby Restaurants',
            location: new Can.Map({})
        });

        var showPosition = function(position) {
            if(typeof position === 'object' && position.coords){
                data.attr('location', position.coords);
            }            
            var compiledTemplate = InitView(data);
            $('#app').append(compiledTemplate);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }        
    }
)