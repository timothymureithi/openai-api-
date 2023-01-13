
  
  const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const url = "https://edition.cnn.com/2023/01/12/politics/biden-documents-final-days-vice-president-aides-scramble/index.html";

async function getStudyNotes() {
  try {


    const response = await fetch(url);
   
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const studyNotes = doc.querySelectorAll("p").textContent;
    const openaiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me 7 bullet points from ${url}\n\n${studyNotes}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(openaiResponse.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
}



getStudyNotes();

        