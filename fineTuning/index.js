import OpenAI from "openai"

const openai = new OpenAI(
    {dangerouslyAllowBrowser: true}
)

/* Upload training data */
const upload = await openai.files.create({
    file: await fetch('./motivationalBotData.json'),
    purpouse: 'fine-tune'
})
console.log(upload)
//{object: "file", id: "file-QxBP3GKvDO7OXsIhI98BhGsn", 
// purpose: "fine-tune", filename: "motivationalBotData.jsonl", 
// bytes: 24147, created_at: 1711377385, 
// status: "processed", status_details: null}


/* Use file ID to create job */
const fineTune = await openai.fineTuning.jobs.create({
    training_file: 'file-QxBP3GKvDO7OXsIhI98BhGsn',
    model: 'gpt-3.5-turbo'
})
// id: "ftjob-AYwT11cpY2sLIaRbs3llYkX4", model: "gpt.....
console.log(fineTune)


/* Check status of a job*/
const fineTuneStatus = await openai.fineTuning.jobs.retrieve('AYwT11cpY2sLIaRbs3llYkX4')
console.log(fineTuneStatus)
    //demora un poco pero me deberia decir status:"succeeded" despues de unos 20 minutos
    //ME DEVUELVE UN fine_tuned_model: "ft:gpt-3.5-turboblablabla"
console.log(fineTune)


/* Test the model*/
// En lugar de pasarle el nombre del modelo normal le tengo que pasar el nombre 
// del modelo creado por fine tune, que empieza asi: ft:gpt-3.5-turboblablabla
const messages = [
    {
        role: 'user',
        content: "I don't know what to do with my life"
    }
 ]
 async function getResponse() {
    const response = await openai.chat.completions.create({
        model: 'ft:gpt-3.5-turbo-0125:scrimba::96fwXrQX',
        messages: messages
    })
    return response.choices[0].message.content
 }
 console.log(await getResponse())
 