$(document).ready(function() {
    // Get the selected language from local storage or default to 'en'
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    // Set the selected language in the dropdown
    $('#language-select').val(selectedLanguage);

    // Load the content for the selected language
    loadContent(selectedLanguage);

    // Change the language when the dropdown is changed
    $('#language-select').change(function() {
        var language = $(this).val();
        localStorage.setItem('selectedLanguage', language);
        loadContent(language);
    });

    function loadContent(language) {
        // Load the content for the selected language from a JSON file
        $.getJSON('content-' + language + '.json', function(data) {
            // Replace the content on the page with the loaded content
            $('#content').html(data.content);
        });
    }
});
