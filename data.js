// Example of populating list using custom fake rest server
async function fetchTasks()
{
    // https://stackoverflow.com/questions/61015299/convert-an-axios-promise-to-a-regular-json-array/61015686

    const response = await axios.get('https://my-json-server.typicode.com/aspenpeakstudios/Redux-Demo/tasks'); 
    return response;
}      


// Example of retrieving images from Unsplash API
async function fetchImages()
{
    const client_id = "av09GaKOAUKnW63ETkzEGg6gOiahgjuxP1F78MPYssk";
    const category = "mountains";
    const url = "https://api.unsplash.com/search/photos?query=" + category + "&orientation=landscape&per_page=20&client_id=" + client_id;

    const response = await axios.get(url);
    console.log(response);
    return response;
}