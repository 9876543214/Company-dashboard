export default defineEventHandler(async (event) => {  
    const notesData = [
        {id: 1, title: 'Notes1', content: 'Testdata notes 1'},
        {id: 2, title: 'Notes2', content: 'Testdata notes 2'},
        {id: 3, title: 'Notes3', content: 'Testdata notes 3 asdfkjsadlødskjffghjghj sdfgfsdgdgdsfgdsfggfds gsdgfdsgdsfgfdgsdgdsgdsfgdsfgsdgfsdgdgdsg sdgdgsdfasdfkjsdaøfjasødfkj asdkfjsdafjdsafkjdsafja sdkfjasdlkfasøldkfj asdflkjasødlkjsadl køjsaløkdsadk lfjaskld'},
        {id: 4, title: 'Notes4', content: 'Testdata notes 4'},
        {id: 5, title: 'Notes5', content: 'Testdata notes 5 asdfasdfsadfsadfsdafasdfasdfdasfasffasdadsafsfasdfdasdfsafsf'}
    ]  
    return notesData
})