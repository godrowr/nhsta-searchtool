
$(function() {
	$("#btn").click(function(event){
		event.preventDefault();
		console.log("hey!")
	});
	
	function ajaxGet(){
        $.ajax({
            url: "",
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