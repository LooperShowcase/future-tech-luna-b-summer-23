let open_respons;

let chat = [
    {role : "user", content : "Hi"} , 
    { role : "assistant" , content : "hi , how can I help you today " }
];

async function chatUserAdd(feeling , question){
    chat.push({role : "user" , content : "my happiness frome 0-10 is "+ feeling+ ". my input is : "+ question} );
}
async function chatassistantAdd(res){
    chat.push({role : "assistant" , content :res} ); }


async function openai_test() {
    let url = "https://api.openai.com/v1/chat/completions";
    let part1 = "sk";
let part2 = "-LLDtZIQbt300rIyi";
let part3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";

let allParts = part1 + part2 + part3;

    let data = {
        model: "gpt-3.5-turbo",
        messages : chat 
    }
    let response;
    try {
         response = await fetch(url,{
            method : "POST" , 
            headers : {
                "Content-Type" : "application/json", 
                Authorization : `Bearer ${allParts}`
            },
            body: JSON.stringify(data)
        })
    }catch(error)
    {
        console.log("opps an error"+error);

    }

    if (response.ok)
    {
        const responseData = await response.json();
        const message = responseData.choices[0].message.content;

        chatassistantAdd(message);

        const speech = new SpeechSynthesisUtterance (message);
        speechSynthesis.speak(speech);
        return message;
    }

}
