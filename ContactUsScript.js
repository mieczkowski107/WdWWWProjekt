$(document).ready(function () {
    $("#btn").click(function (e) {
        e.preventDefault();

        var formElement = document.getElementById("myform");
        if (formElement.checkValidity()) {
            //formatowanie
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
            // wysyłanie danych do serwera
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/message",
                data: JSON.stringify(jsonData), // konwertowanie
                contentType: "application/json",
                success: function (response) {
                    console.log("Data sent successfully:", response);
                },
                error: function (xhr, status, error) {
                    console.error("Error sending data:", error);
                }
            });
        } else {
            formElement.reportValidity();
        }
    });
});