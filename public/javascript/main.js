
$( document ).ready(function() {
	
	// GET REQUEST
	$("#btn").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
        $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2",
            type: "GET",
            dataType: "json",
            success: function(result)
            {
                console.log(result);
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
	}
})