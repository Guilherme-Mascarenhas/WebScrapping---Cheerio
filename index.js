const axios = require('axios');
const cheerio = require('cheerio');

// Array onde ira ser inserido os paises
const countries = [];
const totalItem = 0;

const scrap = async ()=>{

	// Atraves do Axios iremos realizar uma requisição GET para conseguir extrair o HTML da pagina
	// Curiosidade: Funciona igual o Google, onde essa ferramenta de pesquisa realiza uma requisições GET para exibir a pagina.
	const response = await axios.get('https://www.scrapethissite.com/pages/simple/');

	//Esse log mostra o conteudo HTML da pagina
	//console.log(response.data);

	const $ = cheerio.load(response.data);

	//Estamos interando sobre as classes country-name e dela extraindo os textos, onde se nao houver o cheerio busca dentro
	// De country-name (Seus Filhos)
	$('.country-name').each((i, item)=>{
		countries.push({name: $(item).text().trim()});
	});

	//Devido as info ser 1 X 1, podemos interar sobre countries e ir adicionando uma Capital em tempo de execução ao array
	$('.country-capital').each((i, item)=>{
		countries[i].capital = $(item).text().trim();
	});

	$('.country-population').each((i, item)=>{
		countries[i].population = $(item).text().trim();
	});

	console.log(countries);

}

scrap();