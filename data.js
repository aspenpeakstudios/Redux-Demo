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

}