$(document).ready(function () {
    $("#btn").click(function (e) {
        e.preventDefault(); // Prevent form submission

        var formElement = document.getElementById("myform");
        if (formElement.checkValidity()) {
            // Form is valid, proceed with serialization
            var jsonData = {};
            var formData = $("#myform").serializeArray();
            $.each(formData, function () {
                if (jsonData[this.name]) {
                    if (!jsonData[this.name].push) {
                        jsonData[this.name] = [jsonData[this.name]];
                    }
                    jsonData[this.name].push(this.value || '');
                } else {
                    jsonData[this.name] = this.value || '';
                }
            });
            // console.log(jsonData); // You can send this data to the server using AJAX
            $.ajax({
                type: "POST", // Use POST method
                url: "http://localhost:3000/message", // Replace with your server URL
                data: JSON.stringify(jsonData), // Convert data to JSON format
                contentType: "application/json", // Set content type to JSON
                success: function (response) {
                    // Handle the server response (if needed)
                    console.log("Data sent successfully:", response);
                },
                error: function (xhr, status, error) {
                    // Handle errors (if any)
                    console.error("Error sending data:", error);
                }
            });
        } else {
            // Form is invalid, display error messages
            formElement.reportValidity();
        }
    });
});