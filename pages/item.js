import view from "../utils/view.js";
import Story from "../components/story.js";
import baseUrl from "../utils/baseUrl.js";


export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false;
    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch(error){
        hasError = true;
        console.error(error)    }

        if(hasError){
            view.innerHTML = `<div class="error">Error fetching story</div>`
        }

    view.innerHTML = `<div> 
    
    ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comment'}
    `
}

async function getStory(){
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseUrl}/items/${storyId}`);
    const story    = await response.json();
    return story;
}