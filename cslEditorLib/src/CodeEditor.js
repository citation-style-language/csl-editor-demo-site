


// Hard-coded data for the example citations

define('src/exampleData',[],function () {
	var CSLEDIT_exampleData = {};

	// Possible options to apply to each reference in each inline citation
	CSLEDIT_exampleData.additionalOptions = [
		{
			"description" : "Normal citation",
			"options" : {}
		},
		{
			"description" : "Locator: Pages 244-255",
			"options" : {
				"locator" : "244-252",
				"label" : "page"
			}
		},
		{
			"description" : "Locator: Chapter 5",
			"options" : {
				"locator" : "5",
				"label" : "chapter"
			}
		},
		{
			"description" : "Author only",
			"options" : {
				"author-only" : true
			}
		},
		{
			"description" : "Suppress author",
			"options" : {
				"suppress-author" : true
			}
		}
	];

	// Hard coded default list of csl-data.json references used
	// in the editor and search pages
	CSLEDIT_exampleData.jsonDocumentList = [
	{
		"type": "article-journal",
		"title": "Virgo: a laser interferometer to detect gravitational waves",
		"container-title": "Journal of Instrumentation",
		"page": "P03012-P03012",
		"volume": "7",
		"issue": "03",
		"abstract": "This paper presents a complete description of Virgo, the French-Italian gravitational wave detector.\n The detector, built at Cascina, near Pisa (Italy), is a very large Michelson interferometer, with 3\n km-long arms. In this paper, following a presentation of the physics requirements, leading to the\n specifications for the construction of the detector, a detailed description of all its different\n elements is given. These include civil engineering infrastructures, a huge ultra-high vacuum (UHV)\n chamber (about 6000 cubic metres), all of the optical components, including high quality mirrors and\n their seismic isolating suspensions, all of the electronics required to control the interferometer\n and for signal detection. The expected performances of these different elements are given, leading\n to an overall sensitivity curve as a function of the incoming gravitational wave frequency. This\n description represents the detector as built and used in the first data-taking runs. Improvements in\n different parts have been and continue to be performed, leading to better sensitivities. These will\n be detailed in a forthcoming paper.",
		"DOI": "10.1088/1748-0221/7/03/P03012",
		"ISSN": "1748-0221",
		"journalAbbreviation": "J. Instrum.",
		"language": "en-US",
		"author": [
			{
				"family": "Accadia",
				"given": "T"
			},
			{
				"family": "Acernese",
				"given": "F"
			},
			{
				"family": "Alshourbagy",
				"given": "M"
			},
			{
				"family": "Amico",
				"given": "P"
			},
			{
				"family": "Antonucci",
				"given": "F"
			},
			{
				"family": "Aoudia",
				"given": "S"
			},
			{
				"family": "Arnaud",
				"given": "N"
			},
			{
				"family": "Arnault",
				"given": "C"
			},
			{
				"family": "Arun",
				"given": "K G"
			},
			{
				"family": "Astone",
				"given": "P"
			},
			{
				"family": "Avino",
				"given": "S"
			},
			{
				"family": "Babusci",
				"given": "D"
			},
			{
				"family": "Ballardin",
				"given": "G"
			},
			{
				"family": "Barone",
				"given": "F"
			},
			{
				"family": "Barrand",
				"given": "G"
			},
			{
				"family": "Barsotti",
				"given": "L"
			},
			{
				"family": "Barsuglia",
				"given": "M"
			},
			{
				"family": "Basti",
				"given": "A"
			},
			{
				"family": "Bauer",
				"given": "Th S"
			},
			{
				"family": "Beauville",
				"given": "F"
			},
			{
				"family": "Bebronne",
				"given": "M"
			},
			{
				"family": "Bejger",
				"given": "M"
			},
			{
				"family": "Beker",
				"given": "M G"
			},
			{
				"family": "Bellachia",
				"given": "F"
			},
			{
				"family": "Belletoile",
				"given": "A"
			},
			{
				"family": "Beney",
				"given": "J L"
			},
			{
				"family": "Bernardini",
				"given": "M"
			},
			{
				"family": "Bigotta",
				"given": "S"
			},
			{
				"family": "Bilhaut",
				"given": "R"
			},
			{
				"family": "Birindelli",
				"given": "S"
			},
			{
				"family": "Bitossi",
				"given": "M"
			},
			{
				"family": "Bizouard",
				"given": "M A"
			},
			{
				"family": "Blom",
				"given": "M"
			},
			{
				"family": "Boccara",
				"given": "C"
			},
			{
				"family": "Boget",
				"given": "D"
			},
			{
				"family": "Bondu",
				"given": "F"
			},
			{
				"family": "Bonelli",
				"given": "L"
			},
			{
				"family": "Bonnand",
				"given": "R"
			},
			{
				"family": "Boschi",
				"given": "V"
			},
			{
				"family": "Bosi",
				"given": "L"
			},
			{
				"family": "Bouedo",
				"given": "T"
			},
			{
				"family": "Bouhou",
				"given": "B"
			},
			{
				"family": "Bozzi",
				"given": "A"
			},
			{
				"family": "Bracci",
				"given": "L"
			},
			{
				"family": "Braccini",
				"given": "S"
			},
			{
				"family": "Bradaschia",
				"given": "C"
			},
			{
				"family": "Branchesi",
				"given": "M"
			},
			{
				"family": "Briant",
				"given": "T"
			},
			{
				"family": "Brillet",
				"given": "A"
			},
			{
				"family": "Brisson",
				"given": "V"
			},
			{
				"family": "Brocco",
				"given": "L"
			},
			{
				"family": "Bulik",
				"given": "T"
			},
			{
				"family": "Bulten",
				"given": "H J"
			},
			{
				"family": "Buskulic",
				"given": "D"
			},
			{
				"family": "Buy",
				"given": "C"
			},
			{
				"family": "Cagnoli",
				"given": "G"
			},
			{
				"family": "Calamai",
				"given": "G"
			},
			{
				"family": "Calloni",
				"given": "E"
			},
			{
				"family": "Campagna",
				"given": "E"
			},
			{
				"family": "Canuel",
				"given": "B"
			},
			{
				"family": "Carbognani",
				"given": "F"
			},
			{
				"family": "Carbone",
				"given": "L"
			},
			{
				"family": "Cavalier",
				"given": "F"
			},
			{
				"family": "Cavalieri",
				"given": "R"
			},
			{
				"family": "Cecchi",
				"given": "R"
			},
			{
				"family": "Cella",
				"given": "G"
			},
			{
				"family": "Cesarini",
				"given": "E"
			},
			{
				"family": "Chassande-Mottin",
				"given": "E"
			},
			{
				"family": "Chatterji",
				"given": "S"
			},
			{
				"family": "Chiche",
				"given": "R"
			},
			{
				"family": "Chincarini",
				"given": "A"
			},
			{
				"family": "Chiummo",
				"given": "A"
			},
			{
				"family": "Christensen",
				"given": "N"
			},
			{
				"family": "Clapson",
				"given": "A C"
			},
			{
				"family": "Cleva",
				"given": "F"
			},
			{
				"family": "Coccia",
				"given": "E"
			},
			{
				"family": "Cohadon",
				"given": "P -F"
			},
			{
				"family": "Colacino",
				"given": "C N"
			},
			{
				"family": "Colas",
				"given": "J"
			},
			{
				"family": "Colla",
				"given": "A"
			},
			{
				"family": "Colombini",
				"given": "M"
			},
			{
				"family": "Conforto",
				"given": "G"
			},
			{
				"family": "Corsi",
				"given": "A"
			},
			{
				"family": "Cortese",
				"given": "S"
			},
			{
				"family": "Cottone",
				"given": "F"
			},
			{
				"family": "Coulon",
				"given": "J -P"
			},
			{
				"family": "Cuoco",
				"given": "E"
			},
			{
				"family": "D'Antonio",
				"given": "S"
			},
			{
				"family": "Daguin",
				"given": "G"
			},
			{
				"family": "Dari",
				"given": "A"
			},
			{
				"family": "Dattilo",
				"given": "V"
			},
			{
				"family": "David",
				"given": "P Y"
			},
			{
				"family": "Davier",
				"given": "M"
			},
			{
				"family": "Day",
				"given": "R"
			},
			{
				"family": "Debreczeni",
				"given": "G"
			},
			{
				"family": "Carolis",
				"given": "G De"
			},
			{
				"family": "Dehamme",
				"given": "M"
			},
			{
				"family": "Fabbro",
				"given": "R Del"
			},
			{
				"family": "Pozzo",
				"given": "W Del"
			},
			{
				"family": "Prete",
				"given": "M del"
			},
			{
				"family": "Derome",
				"given": "L"
			},
			{
				"family": "Rosa",
				"given": "R De"
			},
			{
				"family": "DeSalvo",
				"given": "R"
			},
			{
				"family": "Dialinas",
				"given": "M"
			},
			{
				"family": "Fiore",
				"given": "L Di"
			},
			{
				"family": "Lieto",
				"given": "A Di"
			},
			{
				"family": "Emilio",
				"given": "M Di Paolo"
			},
			{
				"family": "Virgilio",
				"given": "A Di"
			},
			{
				"family": "Dietz",
				"given": "A"
			},
			{
				"family": "Doets",
				"given": "M"
			},
			{
				"family": "Dominici",
				"given": "P"
			},
			{
				"family": "Dominjon",
				"given": "A"
			},
			{
				"family": "Drago",
				"given": "M"
			},
			{
				"family": "Drezen",
				"given": "C"
			},
			{
				"family": "Dujardin",
				"given": "B"
			},
			{
				"family": "Dulach",
				"given": "B"
			},
			{
				"family": "Eder",
				"given": "C"
			},
			{
				"family": "Eleuteri",
				"given": "A"
			},
			{
				"family": "Enard",
				"given": "D"
			},
			{
				"family": "Evans",
				"given": "M"
			},
			{
				"family": "Fabbroni",
				"given": "L"
			},
			{
				"family": "Fafone",
				"given": "V"
			},
			{
				"family": "Fang",
				"given": "H"
			},
			{
				"family": "Ferrante",
				"given": "I"
			},
			{
				"family": "Fidecaro",
				"given": "F"
			},
			{
				"family": "Fiori",
				"given": "I"
			},
			{
				"family": "Flaminio",
				"given": "R"
			},
			{
				"family": "Forest",
				"given": "D"
			},
			{
				"family": "Forte",
				"given": "L A"
			},
			{
				"family": "Fournier",
				"given": "J -D"
			},
			{
				"family": "Fournier",
				"given": "L"
			},
			{
				"family": "Franc",
				"given": "J"
			},
			{
				"family": "Francois",
				"given": "O"
			},
			{
				"family": "Frasca",
				"given": "S"
			},
			{
				"family": "Frasconi",
				"given": "F"
			},
			{
				"family": "Freise",
				"given": "A"
			},
			{
				"family": "Gaddi",
				"given": "A"
			},
			{
				"family": "Galimberti",
				"given": "M"
			},
			{
				"family": "Gammaitoni",
				"given": "L"
			},
			{
				"family": "Ganau",
				"given": "P"
			},
			{
				"family": "Garnier",
				"given": "C"
			},
			{
				"family": "Garufi",
				"given": "F"
			},
			{
				"family": "G\u00e1sp\u00e1r",
				"given": "M E"
			},
			{
				"family": "Gemme",
				"given": "G"
			},
			{
				"family": "Genin",
				"given": "E"
			},
			{
				"family": "Gennai",
				"given": "A"
			},
			{
				"family": "Gennaro",
				"given": "G"
			},
			{
				"family": "Giacobone",
				"given": "L"
			},
			{
				"family": "Giazotto",
				"given": "A"
			},
			{
				"family": "Giordano",
				"given": "G"
			},
			{
				"family": "Giordano",
				"given": "L"
			},
			{
				"family": "Girard",
				"given": "C"
			},
			{
				"family": "Gouaty",
				"given": "R"
			},
			{
				"family": "Grado",
				"given": "A"
			},
			{
				"family": "Granata",
				"given": "M"
			},
			{
				"family": "Granata",
				"given": "V"
			},
			{
				"family": "Grave",
				"given": "X"
			},
			{
				"family": "Greverie",
				"given": "C"
			},
			{
				"family": "Groenstege",
				"given": "H"
			},
			{
				"family": "Guidi",
				"given": "G M"
			},
			{
				"family": "Hamdani",
				"given": "S"
			},
			{
				"family": "Hayau",
				"given": "J -F"
			},
			{
				"family": "Hebri",
				"given": "S"
			},
			{
				"family": "Heidmann",
				"given": "A"
			},
			{
				"family": "Heitmann",
				"given": "H"
			},
			{
				"family": "Hello",
				"given": "P"
			},
			{
				"family": "Hemming",
				"given": "G"
			},
			{
				"family": "Hennes",
				"given": "E"
			},
			{
				"family": "Hermel",
				"given": "R"
			},
			{
				"family": "Heusse",
				"given": "P"
			},
			{
				"family": "Holloway",
				"given": "L"
			},
			{
				"family": "Huet",
				"given": "D"
			},
			{
				"family": "Iannarelli",
				"given": "M"
			},
			{
				"family": "Jaranowski",
				"given": "P"
			},
			{
				"family": "Jehanno",
				"given": "D"
			},
			{
				"family": "Journet",
				"given": "L"
			},
			{
				"family": "Karkar",
				"given": "S"
			},
			{
				"family": "Ketel",
				"given": "T"
			},
			{
				"family": "Voet",
				"given": "H"
			},
			{
				"family": "Kovalik",
				"given": "J"
			},
			{
				"family": "Kowalska",
				"given": "I"
			},
			{
				"family": "Kreckelbergh",
				"given": "S"
			},
			{
				"family": "Krolak",
				"given": "A"
			},
			{
				"family": "Lacotte",
				"given": "J C"
			},
			{
				"family": "Lagrange",
				"given": "B"
			},
			{
				"family": "Penna",
				"given": "P La"
			},
			{
				"family": "Laval",
				"given": "M"
			},
			{
				"family": "Marec",
				"given": "J C Le"
			},
			{
				"family": "Leroy",
				"given": "N"
			},
			{
				"family": "Letendre",
				"given": "N"
			},
			{
				"family": "Li",
				"given": "T G F"
			},
			{
				"family": "Lieunard",
				"given": "B"
			},
			{
				"family": "Liguori",
				"given": "N"
			},
			{
				"family": "Lodygensky",
				"given": "O"
			},
			{
				"family": "Lopez",
				"given": "B"
			},
			{
				"family": "Lorenzini",
				"given": "M"
			},
			{
				"family": "Loriette",
				"given": "V"
			},
			{
				"family": "Losurdo",
				"given": "G"
			},
			{
				"family": "Loupias",
				"given": "M"
			},
			{
				"family": "Mackowski",
				"given": "J M"
			},
			{
				"family": "Maiani",
				"given": "T"
			},
			{
				"family": "Majorana",
				"given": "E"
			},
			{
				"family": "Magazz\u00f9",
				"given": "C"
			},
			{
				"family": "Maksimovic",
				"given": "I"
			},
			{
				"family": "Malvezzi",
				"given": "V"
			},
			{
				"family": "Man",
				"given": "N"
			},
			{
				"family": "Mancini",
				"given": "S"
			},
			{
				"family": "Mansoux",
				"given": "B"
			},
			{
				"family": "Mantovani",
				"given": "M"
			},
			{
				"family": "Marchesoni",
				"given": "F"
			},
			{
				"family": "Marion",
				"given": "F"
			},
			{
				"family": "Marin",
				"given": "P"
			},
			{
				"family": "Marque",
				"given": "J"
			},
			{
				"family": "Martelli",
				"given": "F"
			},
			{
				"family": "Masserot",
				"given": "A"
			},
			{
				"family": "Massonnet",
				"given": "L"
			},
			{
				"family": "Matone",
				"given": "G"
			},
			{
				"family": "Matone",
				"given": "L"
			},
			{
				"family": "Mazzoni",
				"given": "M"
			},
			{
				"family": "Menzinger",
				"given": "F"
			},
			{
				"family": "Michel",
				"given": "C"
			},
			{
				"family": "Milano",
				"given": "L"
			},
			{
				"family": "Minenkov",
				"given": "Y"
			},
			{
				"family": "Mitra",
				"given": "S"
			},
			{
				"family": "Mohan",
				"given": "M"
			},
			{
				"family": "Montorio",
				"given": "J -L"
			},
			{
				"family": "Morand",
				"given": "R"
			},
			{
				"family": "Moreau",
				"given": "F"
			},
			{
				"family": "Moreau",
				"given": "J"
			},
			{
				"family": "Morgado",
				"given": "N"
			},
			{
				"family": "Morgia",
				"given": "A"
			},
			{
				"family": "Mosca",
				"given": "S"
			},
			{
				"family": "Moscatelli",
				"given": "V"
			},
			{
				"family": "Mours",
				"given": "B"
			},
			{
				"family": "Mugnier",
				"given": "P"
			},
			{
				"family": "Mul",
				"given": "F -A"
			},
			{
				"family": "Naticchioni",
				"given": "L"
			},
			{
				"family": "Neri",
				"given": "I"
			},
			{
				"family": "Nocera",
				"given": "F"
			},
			{
				"family": "Pacaud",
				"given": "E"
			},
			{
				"family": "Pagliaroli",
				"given": "G"
			},
			{
				"family": "Pai",
				"given": "A"
			},
			{
				"family": "Palladino",
				"given": "L"
			},
			{
				"family": "Palomba",
				"given": "C"
			},
			{
				"family": "Paoletti",
				"given": "F"
			},
			{
				"family": "Paoletti",
				"given": "R"
			},
			{
				"family": "Paoli",
				"given": "A"
			},
			{
				"family": "Pardi",
				"given": "S"
			},
			{
				"family": "Parguez",
				"given": "G"
			},
			{
				"family": "Parisi",
				"given": "M"
			},
			{
				"family": "Pasqualetti",
				"given": "A"
			},
			{
				"family": "Passaquieti",
				"given": "R"
			},
			{
				"family": "Passuello",
				"given": "D"
			},
			{
				"family": "Perciballi",
				"given": "M"
			},
			{
				"family": "Perniola",
				"given": "B"
			},
			{
				"family": "Persichetti",
				"given": "G"
			},
			{
				"family": "Petit",
				"given": "S"
			},
			{
				"family": "Pichot",
				"given": "M"
			},
			{
				"family": "Piergiovanni",
				"given": "F"
			},
			{
				"family": "Pietka",
				"given": "M"
			},
			{
				"family": "Pignard",
				"given": "R"
			},
			{
				"family": "Pinard",
				"given": "L"
			},
			{
				"family": "Poggiani",
				"given": "R"
			},
			{
				"family": "Popolizio",
				"given": "P"
			},
			{
				"family": "Pradier",
				"given": "T"
			},
			{
				"family": "Prato",
				"given": "M"
			},
			{
				"family": "Prodi",
				"given": "G A"
			},
			{
				"family": "Punturo",
				"given": "M"
			},
			{
				"family": "Puppo",
				"given": "P"
			},
			{
				"family": "Qipiani",
				"given": "K"
			},
			{
				"family": "Rabaste",
				"given": "O"
			},
			{
				"family": "Rabeling",
				"given": "D S"
			},
			{
				"family": "R\u00e1cz",
				"given": "I"
			},
			{
				"family": "Raffaelli",
				"given": "F"
			},
			{
				"family": "Rapagnani",
				"given": "P"
			},
			{
				"family": "Rapisarda",
				"given": "S"
			},
			{
				"family": "Re",
				"given": "V"
			},
			{
				"family": "Reboux",
				"given": "A"
			},
			{
				"family": "Regimbau",
				"given": "T"
			},
			{
				"family": "Reita",
				"given": "V"
			},
			{
				"family": "Remilleux",
				"given": "A"
			},
			{
				"family": "Ricci",
				"given": "F"
			},
			{
				"family": "Ricciardi",
				"given": "I"
			},
			{
				"family": "Richard",
				"given": "F"
			},
			{
				"family": "Ripepe",
				"given": "M"
			},
			{
				"family": "Robinet",
				"given": "F"
			},
			{
				"family": "Rocchi",
				"given": "A"
			},
			{
				"family": "Rolland",
				"given": "L"
			},
			{
				"family": "Romano",
				"given": "R"
			},
			{
				"family": "Rosi\u0144ska",
				"given": "D"
			},
			{
				"family": "Roudier",
				"given": "P"
			},
			{
				"family": "Ruggi",
				"given": "P"
			},
			{
				"family": "Russo",
				"given": "G"
			},
			{
				"family": "Salconi",
				"given": "L"
			},
			{
				"family": "Sannibale",
				"given": "V"
			},
			{
				"family": "Sassolas",
				"given": "B"
			},
			{
				"family": "Sentenac",
				"given": "D"
			},
			{
				"family": "Solimeno",
				"given": "S"
			},
			{
				"family": "Sottile",
				"given": "R"
			},
			{
				"family": "Sperandio",
				"given": "L"
			},
			{
				"family": "Stanga",
				"given": "R"
			},
			{
				"family": "Sturani",
				"given": "R"
			},
			{
				"family": "Swinkels",
				"given": "B"
			},
			{
				"family": "Tacca",
				"given": "M"
			},
			{
				"family": "Taddei",
				"given": "R"
			},
			{
				"family": "Taffarello",
				"given": "L"
			},
			{
				"family": "Tarallo",
				"given": "M"
			},
			{
				"family": "Tissot",
				"given": "S"
			},
			{
				"family": "Toncelli",
				"given": "A"
			},
			{
				"family": "Tonelli",
				"given": "M"
			},
			{
				"family": "Torre",
				"given": "O"
			},
			{
				"family": "Tournefier",
				"given": "E"
			},
			{
				"family": "Travasso",
				"given": "F"
			},
			{
				"family": "Tremola",
				"given": "C"
			},
			{
				"family": "Turri",
				"given": "E"
			},
			{
				"family": "Vajente",
				"given": "G"
			},
			{
				"family": "Brand",
				"given": "J F J van den"
			},
			{
				"family": "Broeck",
				"given": "C Van Den"
			},
			{
				"family": "Putten",
				"given": "S van der"
			},
			{
				"family": "Vasuth",
				"given": "M"
			},
			{
				"family": "Vavoulidis",
				"given": "M"
			},
			{
				"family": "Vedovato",
				"given": "G"
			},
			{
				"family": "Verkindt",
				"given": "D"
			},
			{
				"family": "Vetrano",
				"given": "F"
			},
			{
				"family": "V\u00e9ziant",
				"given": "O"
			},
			{
				"family": "Vicer\u00e9",
				"given": "A"
			},
			{
				"family": "Vinet",
				"given": "J -Y"
			},
			{
				"family": "Vilalte",
				"given": "S"
			},
			{
				"family": "Vitale",
				"given": "S"
			},
			{
				"family": "Vocca",
				"given": "H"
			},
			{
				"family": "Ward",
				"given": "R L"
			},
			{
				"family": "Was",
				"given": "M"
			},
			{
				"family": "Yamamoto",
				"given": "K"
			},
			{
				"family": "Yvert",
				"given": "M"
			},
			{
				"family": "Zendri",
				"given": "J -P"
			},
			{
				"family": "Zhang",
				"given": "Z"
			}
		],
		"issued": {
			"date-parts": [
				[
					"2012",
					3,
					29
				]
			]
		}
	},
	{
		"type": "report",
		"title": "Country clustering in comparative political economy",
		"publisher": "Max-Planck Institute for the Study of Societies",
		"publisher-place": "Cologne",
		"page": "32",
		"genre": "MPIfG Discussion Paper",
		"event-place": "Cologne",
		"URL": "www.mpifg.de/pu/mpifg_dp/dp09-5.pdf",
		"number": "09-5",
		"author": [
			{
				"family": "Ahlquist",
				"given": "John S."
			},
			{
				"family": "Breunig",
				"given": "Christian"
			}
		],
		"issued": {
			"date-parts": [
				[
					2009
				]
			]
		},
		"accessed": {
			"date-parts": [
				[
					2012,
					12,
					15
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Selected non-fictions",
		"publisher": "Viking",
		"publisher-place": "New York",
		"number-of-pages": "559",
		"event-place": "New York",
		"ISBN": "0670849472",
		"language": "en-US",
		"author": [
			{
				"family": "Borges",
				"given": "Jorge Luis"
			}
		],
		"editor": [
			{
				"family": "Weinberger",
				"given": "Eliot"
			}
		],
		"translator": [
			{
				"family": "Allen",
				"given": "Esther"
			},
			{
				"family": "Levine",
				"given": "Suzanne Jill"
			},
			{
				"family": "Weinberger",
				"given": "Eliot"
			}
		],
		"issued": {
			"date-parts": [
				[
					1999
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "The varieties of capitalism and hybrid success",
		"container-title": "Comparative Political Studies",
		"page": "307-332",
		"volume": "40",
		"issue": "3",
		"abstract": "The varieties of capitalism literature maintains that advanced capitalist countries whose institutions best fit either the liberal or coordinated market economy types will perform better than countries whose institutions are mixed. This is because hybrids are less likely to yield functionally beneficial institutional complementarities. The authors challenge this assertion. Denmark has performed as well as many purer cases during the 1990s. And Denmark has recently developed a more hybrid form than is generally recognized by (a) increasing the exposure of actors to market forces and (b) decentralizing collective learning and decision making. The institutional complementarities associated with such hybridization have contributed to its success; however, these complementarities are based on institutional heterogeneity rather than homogeneity. This is demonstrated by analyses of three cases: Danish labor markets, vocational training, and industrial policy. The implication of the authors' argument is that the varieties of capitalism theory is logically flawed.",
		"URL": "http://cps.sagepub.com.turing.library.northwestern.edu/content/40/3/307.abstract",
		"DOI": "10.1177/0010414006286542",
		"ISSN": "1552-3829",
		"journalAbbreviation": "Comp. Polit. Stud.",
		"language": "en-US",
		"author": [
			{
				"family": "Campbell",
				"given": "John L."
			},
			{
				"family": "Pedersen",
				"given": "Ove K."
			}
		],
		"issued": {
			"date-parts": [
				[
					"2007",
					3,
					1
				]
			]
		},
		"accessed": {
			"date-parts": [
				[
					2010,
					7,
					26
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Planting green roofs and living walls",
		"publisher": "Timber Press",
		"publisher-place": "Portland, OR",
		"number-of-pages": "328",
		"edition": "2",
		"event-place": "Portland, OR",
		"abstract": "The latest techniques for planting roofs and walls to enhance our buildings and benefit the environment. The green roof industry is booming and the technology changing fast as professionals respond to the unique challenges of each new planting. In this comprehensively updated, fully revised edition of their authoritative reference, Nigel Dunnett and Nol Kingsbury reveal the very latest techniques, materials, and plants, and showcase some spectacular new case studies for the non-professional. Green roofs and walls reduce pollution and runoff, help insulate and reduce the maintenance needs of buildings, contribute to biodiversity, and provide habitats for wildlife. In addition to all this, they are attractive to look at and enhance the quality of life of residents. In Planting Green Roofs and Living Walls, Revised and Updated Edition, the authors describe and illustrate the practical techniques required to design, implement, and maintain a green roof or wall to the highest standards. This informative, up-to-the-minute reference will encourage gardeners everywhere to consider the enormous benefits to be gained from planting on their roofs and walls.",
		"ISBN": "0881929115",
		"language": "en-US",
		"author": [
			{
				"family": "Dunnett",
				"given": "Nigel"
			},
			{
				"family": "Kingsbury",
				"given": "No\u00ebl"
			}
		],
		"issued": {
			"date-parts": [
				[
					2008
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "On the electrodynamics of moving bodies",
		"container-title": "Annalen der Physik",
		"page": "1-26",
		"volume": "17",
		"issue": "4",
		"abstract": "General description of special relativity",
		"URL": "http://bavard.fourmilab.ch/etexts/einstein/specrel/specrel.pdf",
		"DOI": "10.1088/0143-0807/27/4/007",
		"journalAbbreviation": "Ann. Phys.",
		"language": "en-US",
		"author": [
			{
				"family": "Einstein",
				"given": "Albert"
			}
		],
		"issued": {
			"date-parts": [
				[
					1905
				]
			]
		}
	},
	{
		"type": "article-newspaper",
		"title": "Rooftop greenhouse will boost city farming",
		"container-title": "New York Times",
		"publisher-place": "New York",
		"page": "A20",
		"event-place": "New York",
		"ISSN": "0362-4331",
		"language": "en-US",
		"author": [
			{
				"family": "Foderaro",
				"given": "Lisa W."
			}
		],
		"issued": {
			"date-parts": [
				[
					"2012",
					4,
					6
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Beyond varieties of capitalism: conflict, contradiction, and complementarities in the European economy",
		"publisher": "Oxford University Press",
		"publisher-place": "Oxford and New York",
		"number-of-pages": "438",
		"event-place": "Oxford and New York",
		"ISBN": "9780199206483",
		"shortTitle": "Beyond varieties of capitalism",
		"language": "en-GB",
		"editor": [
			{
				"family": "Hanck\u00e9",
				"given": "Bob"
			},
			{
				"family": "Rhodes",
				"given": "Martin"
			},
			{
				"family": "Thatcher",
				"given": "Mark"
			}
		],
		"issued": {
			"date-parts": [
				[
					2007
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Steve Jobs",
		"publisher": "Simon & Schuster",
		"publisher-place": "New York, NY",
		"number-of-pages": "630",
		"event-place": "New York, NY",
		"ISBN": "9781451648539",
		"language": "en-US",
		"author": [
			{
				"family": "Isaacson",
				"given": "Walter"
			}
		],
		"issued": {
			"date-parts": [
				[
					"2011",
					10,
					24
				]
			]
		}
	},
	{
		"type": "chapter",
		"title": "Firms and the welfare state: When, why, and how does social policy matter to employers?",
		"container-title": "Varieties of capitalism. The institutional foundations of comparative advantage",
		"publisher": "Oxford University Press",
		"publisher-place": "New York",
		"page": "184-213",
		"event-place": "New York",
		"ISBN": "9780199247752",
		"language": "en-US",
		"author": [
			{
				"family": "Mares",
				"given": "Isabela"
			}
		],
		"editor": [
			{
				"family": "Hall",
				"given": "Peter A"
			},
			{
				"family": "Soskice",
				"given": "David"
			}
		],
		"issued": {
			"date-parts": [
				[
					2001
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Shaping the body politic: Art and political formation in early america",
		"publisher": "University of Virginia Press",
		"publisher-place": "Charlottesville, VA",
		"number-of-pages": "313",
		"event-place": "Charlottesville, VA",
		"abstract": "Traditional narratives imply that art in early America was severely limited in scope. By contrast, these essays collectively argue that visual arts played a critical role in shaping an early American understanding of the body politic. American artists in the late colonial and early national periods enlisted the arts to explore and exploit their visions of the relationship of the American colonies to the mother country and, later, to give material shape to the ideals of modern republican nationhood. Taking a uniquely broad view of both politics and art, Shaping the Body Politic ranges in topic from national politics to the politics of national identity, and from presidential portraits to the architectures of the ordinary. The book covers subject matter from the 1760s to the 1820s, ranging from Patience Wright's embodiment of late colonial political tension to Thomas Jefferson's designs for the entry hall at Monticello as a museum. Paul Staiti, Maurie McInnis, and Roger Stein offer new readings of canonical presidential images and spaces: Jean-Antoine Houdon's George Washington, Gilbert Stuart's the Lansdowne portrait of Washington, and Thomas Jefferson's Monticello. In essays that engage print and painting, portraiture and landscape, Wendy Bellion, David Steinberg, and John Crowley explore the formation of national identity. The volume's concluding essays, by Susan Rather and Bernard Herman, examine the politics of the everyday. The accompanying eighty-five illustrations and color plates demonstrate the broad range of politically resonant visual material in early America. ContributorsWendy Bellion, University of Delaware * John E. Crowley, Dalhousie University * Bernard L. Herman, University of North Carolina, Chapel Hill * Maurie D. McInnis, University of Virginia * Louis P. Nelson, University of Virginia * Susan Rather, University of Texas, Austin * Paul Staiti, Mount Holyoke College * Roger B. Stein, emeritus, University of Virginia * David Steinberg, Independent Scholar Thomas Jefferson Foundation Distinguished Lecture Series",
		"ISBN": "0813931029",
		"language": "en-US",
		"author": [
			{
				"family": "McInnis",
				"given": "Maurie Dee"
			},
			{
				"family": "Nelson",
				"given": "Louis P."
			}
		],
		"issued": {
			"date-parts": [
				[
					2011
				]
			]
		}
	},
	{
		"type": "patent",
		"title": "Yo-yo having a modifiable string gap",
		"abstract": "The invention is a yo-yo that includes unique features that enable a user to adjust the yo-yo's string gap. In the preferred embodiment, at least one of the yo-yo's side assemblies includes a screw engaged to a nut that has two thru-bores located in a side-by-side relation. The screw is located to one side of the yo-yo's axis of rotation and can be rotated by a user to adjust the position of the associated side assembly on the yo-yo's axle structure. By appropriate positioning of the side assembly, a user can adjust the yo-yo's performance characteristics.",
		"number": "WO2011US30214",
		"issued": {
			"date-parts": [
				[
					2011
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "Molecular structure of nucleic acids; a structure for deoxyribose nucleic acid",
		"container-title": "Nature",
		"page": "737-738",
		"volume": "171",
		"issue": "4356",
		"abstract": "We wish to suggest a structure for the salt of deoxyribose nucleic acid (D.N.A.). This structure has novel features which are of considerable biological interest.",
		"URL": "http://www.ncbi.nlm.nih.gov/pubmed/13054692",
		"DOI": "10.1038/171737a0",
		"ISSN": "0028-0836",
		"shortTitle": "Molecular structure of nucleic acids",
		"journalAbbreviation": "Nature",
		"language": "en-US",
		"author": [
			{
				"family": "Watson",
				"given": "James Dewey"
			},
			{
				"family": "Crick",
				"given": "Francis Harry Compton"
			}
		],
		"issued": {
			"date-parts": [
				[
					1953
				]
			]
		}
	},
	{
		"type": "webpage",
		"title": "CSL search by example",
		"container-title": "Citation Style Editor",
		"URL": "http://editor.citationstyles.org/searchByExample/",
		"accessed": {
			"date-parts": [
				[
					2012,
					12,
					15
				]
			]
		}
	}
]
	return CSLEDIT_exampleData;
});

// A requireJS plugin that returns an absolute URL given a URL relative to
// the base path
//
// e.g. to use:
//
//     require(['src/getUrl!images/elephant.png'], function (elephantUrl) {
//         // do something with elephantUrl
//     });

define('src/getUrl',{
    load: function (name, req, load, config) {
        load(req.toUrl(name));
    }
});




// Miscellaneous functions to deal with URLs

define('src/urlUtils',['src/getUrl'], function (getUrlPlugin) {

	// Returns the value of the query string variable with the given key,
	// or an empty string if it doesn't exist
	//
	// copied from https://gist.github.com/1771618
	var getUrlVar = function (key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || "";
	};

	// Returns the given url, but with the given queryParamKey removed
	var removeQueryParam = function (url, queryParamKey) {
		return url.replace(/\?/, "&").
				replace(new RegExp("(\\&" + queryParamKey + "=[^&]*)", "i"), "").
				replace(/&/, "?"); // replace first & with ?
	};

	// Gets the absolute URL for a relative path using requireJS
	var getResourceUrl = function (resourcePath, data) {
		var url;
		require(['src/getUrl!' + resourcePath], function (newUrl) {
			url = newUrl;
		});
		// TODO: fix in case of no initial query string (would need '?' instead of '&')
		if (typeof(data) != "undefined") {
			$.each(data, function (key, value) {
				url += "&" + key + "=" + value;
			});
		}
		return url;
	};

	return {
		getUrlVar : getUrlVar,
		removeQueryParam : removeQueryParam,
		getResourceUrl : getResourceUrl
	};
});



// Stores customisation options, typically set via contructor functions (e.g. CSLEDIT_VisualEditor())
//
// Provides default options for some things
//
// These options are expected to stay constant during a session. For options
// that change during a session use src/storage.js

define('src/options',
		[	'jquery',
			'src/exampleData',
			'src/urlUtils',
			'src/getUrl'
		], function (
			$,
			CSLEDIT_exampleData,
			CSLEDIT_urlUtils,
			getUrlPlugin
		) {
	var customOptions = {};
	var defaultOptions = {
			loadCSLFunc : function () {
				alert("load CSL function not implemented");
			},
			saveCSLFunc : function (cslCode) {
				window.location.href =
					"data:application/xml;charset=utf-8," +
					encodeURIComponent(cslCode);
			},
			editStyleName : "Edit Style",
			editStyleFunc : function (url) {
				alert("Edit style not avaiable.\n\n" +
					"For implementers: You need to add an editStyle_func to the options.");
			},
			loadStyleFromUrlFunc : function () {
				alert("load from url not implemented");
			},
			exampleReferences : CSLEDIT_exampleData.jsonDocumentList,
			exampleCitations : [[0], [10], []]
		};

	// create the default options which are a function of user options
	var createExtraDefaults = function () {
		defaultOptions.cslSchema_mainURL = CSLEDIT_urlUtils.getResourceUrl("generated/csl-schema/csl.rng");
		defaultOptions.cslSchema_childURLs = [];
		$.each([
				"generated/csl-schema/csl-categories.rng",
				"generated/csl-schema/csl-terms.rng",
				"generated/csl-schema/csl-types.rng",
				"generated/csl-schema/csl-variables.rng"
			], function (i, path) {
				defaultOptions.cslSchema_childURLs.push(CSLEDIT_urlUtils.getResourceUrl(path));
			}
		);
	};

	// Get the option value from the given key
	//
	// Will check the custom options set using setOptions() first,
	// or fall back to default options
	var get = function (key) {
		if (customOptions.hasOwnProperty(key)) {
			return customOptions[key];
		} else {
			return defaultOptions[key];
		}
	};

	createExtraDefaults();
	
	// Sets the custom options
	var setOptions = function (options) {
		customOptions = options;
		createExtraDefaults();
	};

	return {
		get : get,
		setOptions : setOptions
	};
});




// debug provides:
//
// 1. Logging which won't crash on browsers that don't support 'console'
// 2. Assertions

define('src/debug',[],function () {
	var log, time, timeEnd;

	// TODO: Probably best to change to use console.log(), console.time() and console.timeEnd()
	//       throughout code instead of debug.log(), etc...
	//       Reason: Using console.log() will show the original line number where it was called
	//       from in the Chrome console instead of the line number here in debug.js.
	if (typeof(console) === "undefined" && typeof(window) !== "undefined") {
		log = function () {};
		time = function () {};
		timeEnd = function () {};
	} else {
		log = function (message) { console.log(message); };
		time = function (message) { console.time(message); };
		timeEnd = function (message) { console.timeEnd(message); };
	}

	// Throws an error if actual !== expected and puts the current call stack
	// into the error description
	var assertEqual = function (actual, expected) {
		if (actual !== expected) {
			try {
				throw new Error("Assert fail: " + actual + " !== " + expected);
			} catch (err) {
				// put stack trace message in JSON - hack to access from window.onerror
				err.message = err.stack;
				throw err;
			}
		}
	};

	// Throws an error if !assertation and puts the current call stack
	// into the error description
	var assert = function (assertion) {
		var err;
		if (!assertion) {
			try {
				throw new Error("Assert fail");
			} catch (err) {
				// put stack trace message in JSON - hack to access from window.onerror
				err.message = err.stack;
				throw err;
			}
		}
	};

	return {
		assert : assert,
		assertEqual : assertEqual,
		log : log,
		time : time,
		timeEnd : timeEnd
	};
});



// Provides persistent key/value storage if localStorage is available,
// otherwise falls back to a simple session based storage
//
// Triggers a callback when getItem() is called if the localStorage value has been
// changed since the last time it was read during this session
//
// The following functions work just like the localStorage equivalents:
//
// - getItem
// - setItem
// - removeItem
// - clear
//
// Additionally:
// 
// - onDataInconsistency - this allows setting a callback function which gets
//                         called whenever an inconsistency between persistent
//                         and session storage is detected

define('src/storage',['src/debug'], function (debug) {
	var CSLEDIT_Storage = function (useLocalStorageIfAvailable) {
		var simpleStorage = {}, // duplicates the data in localStorage to use to verify that the
		                        // localStorage hasn't been changed in another tab, or acts as
								// the only storage if localStorage isn't available
			simpleStorageAPI,
			localStorageAPI,
			finalAPI,
			outOfSyncCallback;

		var outOfSync = function () {
			debug.log("CSLEDIT_storage out of sync with local storage");
			if (typeof(outOfSyncCallback) === "function") {
				outOfSyncCallback();
			}
		};

		simpleStorageAPI = {
			getItem : function (key) {
				if (simpleStorage.hasOwnProperty(key)) {
					return simpleStorage[key];
				} else {
					return null;
				}
			},
			setItem : function (key, value) {
				simpleStorage[key] = value;
			},
			removeItem : function (key) {
				delete simpleStorage[key];
			},
			clear : function () {
				simpleStorage = {};
			}
		};

		localStorageAPI = {
			getItem : function (key) {
				return localStorage.getItem(key);
			},
			setItem : function (key, value) {
				localStorage.setItem(key, value);
			},
			removeItem : function (key) {
				localStorage.removeItem(key);
			},
			clear : function () {
				localStorage.clear();
			}
		};

		if (typeof(localStorage) === "undefined" || localStorage === null ||
				useLocalStorageIfAvailable !== true) {
			debug.log("Not using localStorage");
			finalAPI = simpleStorageAPI;
		} else {
			// use local storage, with simple storage to verify that nothing has changed
			finalAPI = {
				getItem : function (key) {
					var simpleValue,
						localValue;
					
					simpleValue = simpleStorageAPI.getItem(key);
					localValue = localStorageAPI.getItem(key);

					if (simpleValue === null && localValue !== null) {
						simpleStorageAPI.setItem(key, localValue);
					} else if (simpleValue !== localValue) {
						outOfSync();
					}

					return localValue;
				},
				setItem : function (key, value) {
					simpleStorageAPI.setItem(key, value);
					localStorageAPI.setItem(key, value);
				},
				removeItem : function (key) {
					simpleStorageAPI.removeItem(key);
					localStorageAPI.removeItem(key);
				},
				clear : function () {
					simpleStorageAPI.clear();
					localStorageAPI.clear();
				},
				recreateLocalStorage : function (key) {
					localStorageAPI.clear();
					$.each(simpleStorage, function (key, value) {
						localStorageAPI.setItem(key, value);
					});
				}
			};
		}
		
		finalAPI.getItemJson = function (key) {
			var data = finalAPI.getItem(key);
			if (data === null) {
				return null;
			} else {
				try {
					return JSON.parse(data);
				} catch (err) {
					return null;
				}
			}
		};

		finalAPI.onDataInconsistency = function (callback) {
			outOfSyncCallback = callback;
		};

		return finalAPI;
	};

	var CSLEDIT_storage = new CSLEDIT_Storage(true);

	return CSLEDIT_storage;
});



// Allows getting and setting
//
// - metadata for the example references
// - example inline citations (citation clusters as citeproc-js calls them)
define('src/exampleCitations',
		[	'jquery',
			'src/storage',
			'src/options',
			'src/exampleData'
		],
		function (
			$,
			CSLEDIT_storage,
			CSLEDIT_options,
			CSLEDIT_exampleData
		) {
	var suppressUpdate = false;

	// Returns a new empty citation cluster
	var newCluster = function (citationIndex) {
		return {
			citationId: "CITATION-" + citationIndex,
			citationItems: [],
			properties: {noteIndex: 0},
			schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"
		};
	};

	// Returns a list of citation clusters as used by citeproc
	var getCitations = function () {
		var citations;
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitations') === null) {

			// create empty reference lists for each citation
			citations = [];
			$.each(CSLEDIT_options.get("exampleCitations"), function (citation) {
				citations.push(newCluster(citation));
			});
			setCitations(citations);

			// populate the reference lists
			$.each(CSLEDIT_options.get("exampleCitations"), function (citation, referenceList) {
				setReferenceIndexesForCitation(citation, referenceList);
			});
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitations');
	};

	// Set the list of citation clusters, each cluster should be in the
	// form required by the citeproc-js appendCitationCluster() function
	var setCitations = function (citations) {
		applyCitationOptions(citations, getCitationOptions());
		CSLEDIT_storage.setItem('CSLEDIT_exampleCitations', JSON.stringify(citations));
		update();
	};
	
	// Gets the index of any options for each reference in each inline citation.
	//
	// e.g.
	//     {
	//         "0":  // inline citation 0
	//             {
	//                 "0": 1,  // reference 0 has option 1
	//                 "1": 0,  // reference 1 has option 0
	//                 "5": 2   // reference 5 has option 2
	//             }
	//     }
	//
	// If a reference is not included in the return object,
	// it's assumed it is option 0, which is a normal citation
	// with no additional options.
	//
	// The options are defined in CSLEDIT_exampleData.additionalOptions
	var getCitationOptions = function () {
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitationOptions') === null) {
			return {};
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitationOptions');
	};

	// This sets the citationOptions
	//
	// citationOptions is the same format as the getCitationOptions() return value
	var setCitationOptions = function (citationOptions) {
		var citations = getCitations();
		CSLEDIT_storage.setItem('CSLEDIT_exampleCitationOptions', JSON.stringify(citationOptions));
		
		applyCitationOptions(citations, citationOptions);
		setCitations(citations);
	};

	var applyCitationOptions = function (citations, citationOptions) {
		// apply options
		$.each(citations, function (citationIndex, citation) {
			var index;
			for (index = 0; index < citation.citationItems.length; index++) {
				var citationItem = citation.citationItems[index],
					referenceIndex = parseInt(citationItem.id.replace("ITEM-", ""), 10) - 1,
					optionIndex = getOption(citationIndex, referenceIndex),
					options = CSLEDIT_exampleData.additionalOptions[optionIndex];
			
				// replace all options
				citationItem = { id : citationItem.id };
				$.each(options.options, function (key, value) {
					citationItem[key] = value;
				});
				citation.citationItems[index] = citationItem;
			}
		});
	};

	// Sets the option for the given reference in the given inline citation
	//
	// option is the index of the citation option to apply, see
	// CSLEDIT_exampleData.additionalOptions for a definition of these options
	var setOption = function (citation, reference, option) {
		var options = getCitationOptions();
		if (option >= CSLEDIT_exampleData.additionalOptions.length) {
			option = 0;
		}
		options[citation] = options[citation] || {};
		options[citation][reference] = option;
		setCitationOptions(options);
	};

	// Returns the index of the option for the given reference in the given inline citation
	//
	// See CSLEDIT_exampleData.additionalOptions for definitions of these options
	var getOption = function (citation, reference) {
		var options = getCitationOptions(),
			option;
		if (!options.hasOwnProperty(citation)) {
			return 0;
		}
		if (!options[citation].hasOwnProperty(reference)) {
			return 0;
		}
		option = options[citation][reference];
		if (option >= CSLEDIT_exampleData.additionalOptions.length) {
			option = 0;
		}
		return option;
	};

	// Returns an object containing metadata for all the references
	// ready to pass to citeproc
	//
	// Very similar to getReferences but returns an object with keys
	// in the form "ITEM-1", "ITEM-2", etc. instead of a list, and
	// each item in the list is given a corresponding id value,
	// e.g. "ITEM-2"
	var getCiteprocReferences = function (references /* optional */) {
		var citeprocReferences = {};

		references = references || getReferences();

		$.each(references, function (i, reference) {
			var itemString = "ITEM-" + (i + 1);
			reference.id = itemString;
			citeprocReferences[itemString] = reference;
		});

		return citeprocReferences;
	};		

	// Returns a list of csl-data.json references
	var getReferences = function () {
		// TODO: At the moment, if CSLEDIT_exampleData.jsonDocumentList is updated between
		//       releases, it will only get used in the Visual Editor if the user resets all
		//       citations in the citation editor dialog, or clears their localSettings.
		//       Should be fixed.
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleReferences') === null) {
			setReferences(CSLEDIT_options.get('exampleReferences'));
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleReferences');
	};

	// Set the list of csl-data.json references, used to
	// build up the inline citation clusters
	var setReferences = function (referenceList) {
		CSLEDIT_storage.setItem('CSLEDIT_exampleReferences', JSON.stringify(referenceList));

		suppressUpdate = true;
		$.each(getCitations(), function (i, citation) {
			limitReferenceIndexesForCitation(i);
		});
		suppressUpdate = false;

		update();
	};

	// remove out of range indexes
	var limitReferenceIndexesForCitation = function (citationIndex) {
		var newReferenceList = [],
			references = getReferences();

		$.each(getReferenceIndexesForCitation(citationIndex), function (i, referenceIndex) {
			if (referenceIndex < references.length) {
				newReferenceList.push(referenceIndex);
			}
		});
		setReferenceIndexesForCitation(citationIndex, newReferenceList);
	};

	// Returns the list of reference indexes using in the given citation
	var getReferenceIndexesForCitation = function (citationIndex) {
		var indexes = [],
			citations = getCitations();

		if (citationIndex >= citations.length) {
			return [];
		}

		$.each(citations[citationIndex].citationItems, function (i, citationItem) {
			indexes.push(parseInt(citationItem.id.replace("ITEM-", ""), 10) - 1);
		});

		return indexes;
	};
	
	// Sets the list of reference indexes used in the given citation.
	//
	// e.g. This will set citation 1 (the 2nd citation) to use references 2 and 4
	//      (reference index 2 corresponds to "ITEM-3" and index 4 to "ITEM-5")
	//
	//      setReferenceIndexesForCitation(1, [2, 4]);
	var setReferenceIndexesForCitation = function (citationIndex, references) {
		var citations = getCitations();
		
		citations[citationIndex] = citations[citationIndex] || newCluster(citationIndex);
		citations[citationIndex].citationItems = [];

		$.each(references, function (i, referenceIndex) {
			citations[citationIndex].citationItems.push({
				id : "ITEM-" + (referenceIndex + 1)
			});
		});

		setCitations(citations);
	};
	
	// Append the given csl-data.json reference to the list of references,
	// and optionally append it to the given inline citation
	var addReference = function (referenceData, citationToAddTo /* optional */ ) {
		var references = getReferences(),
			citations;
		references.push(referenceData);
		setReferences(references);

		if (typeof citationToAddTo !== "undefined") {
			citations = getCitations();
			citations[citationToAddTo].citationItems.push({
				id : "ITEM-" + references.length
			});
			setCitations(citations);
		}
	};

	// Trigger a CSLEDIT_viewController updateFinished event,
	// which will re-generate the citations
	var update = function () {
		if (!suppressUpdate && typeof(CSLEDIT_viewController) !== "undefined") {
			CSLEDIT_viewController.styleChanged("updateFinished");
		}
	};

	// static function
	var createCitationCluster = function (referenceIndexList) {
		var cluster = newCluster();
		
		$.each(referenceIndexList, function (i, referenceIndex) {
			cluster.citationItems.push({
				id : "ITEM-" + (referenceIndex + 1)
			});
		});

		return cluster;
	};

	// Remove any customization of the example citations and use the hard-coded
	// ones instead
	var resetToDefault = function () {
		CSLEDIT_storage.removeItem("CSLEDIT_exampleCitations");
		CSLEDIT_storage.removeItem("CSLEDIT_exampleReferences");
		CSLEDIT_storage.removeItem("CSLEDIT_exampleCitationOptions");
		update();
	};

	return {
		getCitations : getCitations,
		setCitations : setCitations,

		getOption : getOption,
		setOption : setOption,

		getReferences : getReferences,
		setReferences : setReferences,

		getCiteprocReferences : getCiteprocReferences,

		getReferenceIndexesForCitation : getReferenceIndexesForCitation,
		setReferenceIndexesForCitation : setReferenceIndexesForCitation,

		addReference : addReference,

		resetToDefault : resetToDefault,

		createCitationCluster : createCitationCluster
	};
});

(function(){function diff_match_patch(){this.Diff_Timeout=1;this.Diff_EditCost=4;this.Match_Threshold=0.5;this.Match_Distance=1E3;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;this.Match_MaxBits=32}
diff_match_patch.prototype.diff_main=function(a,b,c,d){"undefined"==typeof d&&(d=0>=this.Diff_Timeout?Number.MAX_VALUE:(new Date).getTime()+1E3*this.Diff_Timeout);if(null==a||null==b)throw Error("Null input. (diff_main)");if(a==b)return a?[[0,a]]:[];"undefined"==typeof c&&(c=!0);var e=c,f=this.diff_commonPrefix(a,b),c=a.substring(0,f),a=a.substring(f),b=b.substring(f),f=this.diff_commonSuffix(a,b),g=a.substring(a.length-f),a=a.substring(0,a.length-f),b=b.substring(0,b.length-f),a=this.diff_compute_(a,
b,e,d);c&&a.unshift([0,c]);g&&a.push([0,g]);this.diff_cleanupMerge(a);return a};
diff_match_patch.prototype.diff_compute_=function(a,b,c,d){if(!a)return[[1,b]];if(!b)return[[-1,a]];var e=a.length>b.length?a:b,f=a.length>b.length?b:a,g=e.indexOf(f);if(-1!=g)return c=[[1,e.substring(0,g)],[0,f],[1,e.substring(g+f.length)]],a.length>b.length&&(c[0][0]=c[2][0]=-1),c;if(1==f.length)return[[-1,a],[1,b]];return(e=this.diff_halfMatch_(a,b))?(f=e[0],a=e[1],g=e[2],b=e[3],e=e[4],f=this.diff_main(f,g,c,d),c=this.diff_main(a,b,c,d),f.concat([[0,e]],c)):c&&100<a.length&&100<b.length?this.diff_lineMode_(a,
b,d):this.diff_bisect_(a,b,d)};
diff_match_patch.prototype.diff_lineMode_=function(a,b,c){var d=this.diff_linesToChars_(a,b),a=d.chars1,b=d.chars2,d=d.lineArray,a=this.diff_main(a,b,!1,c);this.diff_charsToLines_(a,d);this.diff_cleanupSemantic(a);a.push([0,""]);for(var e=d=b=0,f="",g="";b<a.length;){switch(a[b][0]){case 1:e++;g+=a[b][1];break;case -1:d++;f+=a[b][1];break;case 0:if(1<=d&&1<=e){a.splice(b-d-e,d+e);b=b-d-e;d=this.diff_main(f,g,!1,c);for(e=d.length-1;0<=e;e--)a.splice(b,0,d[e]);b+=d.length}d=e=0;g=f=""}b++}a.pop();return a};
diff_match_patch.prototype.diff_bisect_=function(a,b,c){for(var d=a.length,e=b.length,f=Math.ceil((d+e)/2),g=f,h=2*f,j=Array(h),i=Array(h),k=0;k<h;k++)j[k]=-1,i[k]=-1;j[g+1]=0;i[g+1]=0;for(var k=d-e,p=0!=k%2,q=0,s=0,o=0,v=0,u=0;u<f&&!((new Date).getTime()>c);u++){for(var n=-u+q;n<=u-s;n+=2){var l=g+n,m;m=n==-u||n!=u&&j[l-1]<j[l+1]?j[l+1]:j[l-1]+1;for(var r=m-n;m<d&&r<e&&a.charAt(m)==b.charAt(r);)m++,r++;j[l]=m;if(m>d)s+=2;else if(r>e)q+=2;else if(p&&(l=g+k-n,0<=l&&l<h&&-1!=i[l])){var t=d-i[l];if(m>=
t)return this.diff_bisectSplit_(a,b,m,r,c)}}for(n=-u+o;n<=u-v;n+=2){l=g+n;t=n==-u||n!=u&&i[l-1]<i[l+1]?i[l+1]:i[l-1]+1;for(m=t-n;t<d&&m<e&&a.charAt(d-t-1)==b.charAt(e-m-1);)t++,m++;i[l]=t;if(t>d)v+=2;else if(m>e)o+=2;else if(!p&&(l=g+k-n,0<=l&&l<h&&-1!=j[l]&&(m=j[l],r=g+m-l,t=d-t,m>=t)))return this.diff_bisectSplit_(a,b,m,r,c)}}return[[-1,a],[1,b]]};
diff_match_patch.prototype.diff_bisectSplit_=function(a,b,c,d,e){var f=a.substring(0,c),g=b.substring(0,d),a=a.substring(c),b=b.substring(d),f=this.diff_main(f,g,!1,e),e=this.diff_main(a,b,!1,e);return f.concat(e)};
diff_match_patch.prototype.diff_linesToChars_=function(a,b){function c(a){for(var b="",c=0,f=-1,g=d.length;f<a.length-1;){f=a.indexOf("\n",c);-1==f&&(f=a.length-1);var q=a.substring(c,f+1),c=f+1;(e.hasOwnProperty?e.hasOwnProperty(q):void 0!==e[q])?b+=String.fromCharCode(e[q]):(b+=String.fromCharCode(g),e[q]=g,d[g++]=q)}return b}var d=[],e={};d[0]="";var f=c(a),g=c(b);return{chars1:f,chars2:g,lineArray:d}};
diff_match_patch.prototype.diff_charsToLines_=function(a,b){for(var c=0;c<a.length;c++){for(var d=a[c][1],e=[],f=0;f<d.length;f++)e[f]=b[d.charCodeAt(f)];a[c][1]=e.join("")}};diff_match_patch.prototype.diff_commonPrefix=function(a,b){if(!a||!b||a.charAt(0)!=b.charAt(0))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;)a.substring(f,e)==b.substring(f,e)?f=c=e:d=e,e=Math.floor((d-c)/2+c);return e};
diff_match_patch.prototype.diff_commonSuffix=function(a,b){if(!a||!b||a.charAt(a.length-1)!=b.charAt(b.length-1))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;)a.substring(a.length-e,a.length-f)==b.substring(b.length-e,b.length-f)?f=c=e:d=e,e=Math.floor((d-c)/2+c);return e};
diff_match_patch.prototype.diff_commonOverlap_=function(a,b){var c=a.length,d=b.length;if(0==c||0==d)return 0;c>d?a=a.substring(c-d):c<d&&(b=b.substring(0,c));c=Math.min(c,d);if(a==b)return c;for(var d=0,e=1;;){var f=a.substring(c-e),f=b.indexOf(f);if(-1==f)return d;e+=f;if(0==f||a.substring(c-e)==b.substring(0,e))d=e,e++}};
diff_match_patch.prototype.diff_halfMatch_=function(a,b){function c(a,b,c){for(var d=a.substring(c,c+Math.floor(a.length/4)),e=-1,g="",h,j,n,l;-1!=(e=b.indexOf(d,e+1));){var m=f.diff_commonPrefix(a.substring(c),b.substring(e)),r=f.diff_commonSuffix(a.substring(0,c),b.substring(0,e));g.length<r+m&&(g=b.substring(e-r,e)+b.substring(e,e+m),h=a.substring(0,c-r),j=a.substring(c+m),n=b.substring(0,e-r),l=b.substring(e+m))}return 2*g.length>=a.length?[h,j,n,l,g]:null}if(0>=this.Diff_Timeout)return null;
var d=a.length>b.length?a:b,e=a.length>b.length?b:a;if(4>d.length||2*e.length<d.length)return null;var f=this,g=c(d,e,Math.ceil(d.length/4)),d=c(d,e,Math.ceil(d.length/2)),h;if(!g&&!d)return null;h=d?g?g[4].length>d[4].length?g:d:d:g;var j;a.length>b.length?(g=h[0],d=h[1],e=h[2],j=h[3]):(e=h[0],j=h[1],g=h[2],d=h[3]);h=h[4];return[g,d,e,j,h]};
diff_match_patch.prototype.diff_cleanupSemantic=function(a){for(var b=!1,c=[],d=0,e=null,f=0,g=0,h=0,j=0,i=0;f<a.length;)0==a[f][0]?(c[d++]=f,g=j,h=i,i=j=0,e=a[f][1]):(1==a[f][0]?j+=a[f][1].length:i+=a[f][1].length,e&&e.length<=Math.max(g,h)&&e.length<=Math.max(j,i)&&(a.splice(c[d-1],0,[-1,e]),a[c[d-1]+1][0]=1,d--,d--,f=0<d?c[d-1]:-1,i=j=h=g=0,e=null,b=!0)),f++;b&&this.diff_cleanupMerge(a);this.diff_cleanupSemanticLossless(a);for(f=1;f<a.length;){if(-1==a[f-1][0]&&1==a[f][0]){b=a[f-1][1];c=a[f][1];
d=this.diff_commonOverlap_(b,c);e=this.diff_commonOverlap_(c,b);if(d>=e){if(d>=b.length/2||d>=c.length/2)a.splice(f,0,[0,c.substring(0,d)]),a[f-1][1]=b.substring(0,b.length-d),a[f+1][1]=c.substring(d),f++}else if(e>=b.length/2||e>=c.length/2)a.splice(f,0,[0,b.substring(0,e)]),a[f-1][0]=1,a[f-1][1]=c.substring(0,c.length-e),a[f+1][0]=-1,a[f+1][1]=b.substring(e),f++;f++}f++}};
diff_match_patch.prototype.diff_cleanupSemanticLossless=function(a){function b(a,b){if(!a||!b)return 6;var c=a.charAt(a.length-1),d=b.charAt(0),e=c.match(diff_match_patch.nonAlphaNumericRegex_),f=d.match(diff_match_patch.nonAlphaNumericRegex_),g=e&&c.match(diff_match_patch.whitespaceRegex_),h=f&&d.match(diff_match_patch.whitespaceRegex_),c=g&&c.match(diff_match_patch.linebreakRegex_),d=h&&d.match(diff_match_patch.linebreakRegex_),i=c&&a.match(diff_match_patch.blanklineEndRegex_),j=d&&b.match(diff_match_patch.blanklineStartRegex_);
return i||j?5:c||d?4:e&&!g&&h?3:g||h?2:e||f?1:0}for(var c=1;c<a.length-1;){if(0==a[c-1][0]&&0==a[c+1][0]){var d=a[c-1][1],e=a[c][1],f=a[c+1][1],g=this.diff_commonSuffix(d,e);if(g)var h=e.substring(e.length-g),d=d.substring(0,d.length-g),e=h+e.substring(0,e.length-g),f=h+f;for(var g=d,h=e,j=f,i=b(d,e)+b(e,f);e.charAt(0)===f.charAt(0);){var d=d+e.charAt(0),e=e.substring(1)+f.charAt(0),f=f.substring(1),k=b(d,e)+b(e,f);k>=i&&(i=k,g=d,h=e,j=f)}a[c-1][1]!=g&&(g?a[c-1][1]=g:(a.splice(c-1,1),c--),a[c][1]=
h,j?a[c+1][1]=j:(a.splice(c+1,1),c--))}c++}};diff_match_patch.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;diff_match_patch.whitespaceRegex_=/\s/;diff_match_patch.linebreakRegex_=/[\r\n]/;diff_match_patch.blanklineEndRegex_=/\n\r?\n$/;diff_match_patch.blanklineStartRegex_=/^\r?\n\r?\n/;
diff_match_patch.prototype.diff_cleanupEfficiency=function(a){for(var b=!1,c=[],d=0,e=null,f=0,g=!1,h=!1,j=!1,i=!1;f<a.length;){if(0==a[f][0])a[f][1].length<this.Diff_EditCost&&(j||i)?(c[d++]=f,g=j,h=i,e=a[f][1]):(d=0,e=null),j=i=!1;else if(-1==a[f][0]?i=!0:j=!0,e&&(g&&h&&j&&i||e.length<this.Diff_EditCost/2&&3==g+h+j+i))a.splice(c[d-1],0,[-1,e]),a[c[d-1]+1][0]=1,d--,e=null,g&&h?(j=i=!0,d=0):(d--,f=0<d?c[d-1]:-1,j=i=!1),b=!0;f++}b&&this.diff_cleanupMerge(a)};
diff_match_patch.prototype.diff_cleanupMerge=function(a){a.push([0,""]);for(var b=0,c=0,d=0,e="",f="",g;b<a.length;)switch(a[b][0]){case 1:d++;f+=a[b][1];b++;break;case -1:c++;e+=a[b][1];b++;break;case 0:1<c+d?(0!==c&&0!==d&&(g=this.diff_commonPrefix(f,e),0!==g&&(0<b-c-d&&0==a[b-c-d-1][0]?a[b-c-d-1][1]+=f.substring(0,g):(a.splice(0,0,[0,f.substring(0,g)]),b++),f=f.substring(g),e=e.substring(g)),g=this.diff_commonSuffix(f,e),0!==g&&(a[b][1]=f.substring(f.length-g)+a[b][1],f=f.substring(0,f.length-
g),e=e.substring(0,e.length-g))),0===c?a.splice(b-d,c+d,[1,f]):0===d?a.splice(b-c,c+d,[-1,e]):a.splice(b-c-d,c+d,[-1,e],[1,f]),b=b-c-d+(c?1:0)+(d?1:0)+1):0!==b&&0==a[b-1][0]?(a[b-1][1]+=a[b][1],a.splice(b,1)):b++,c=d=0,f=e=""}""===a[a.length-1][1]&&a.pop();c=!1;for(b=1;b<a.length-1;)0==a[b-1][0]&&0==a[b+1][0]&&(a[b][1].substring(a[b][1].length-a[b-1][1].length)==a[b-1][1]?(a[b][1]=a[b-1][1]+a[b][1].substring(0,a[b][1].length-a[b-1][1].length),a[b+1][1]=a[b-1][1]+a[b+1][1],a.splice(b-1,1),c=!0):a[b][1].substring(0,
a[b+1][1].length)==a[b+1][1]&&(a[b-1][1]+=a[b+1][1],a[b][1]=a[b][1].substring(a[b+1][1].length)+a[b+1][1],a.splice(b+1,1),c=!0)),b++;c&&this.diff_cleanupMerge(a)};diff_match_patch.prototype.diff_xIndex=function(a,b){var c=0,d=0,e=0,f=0,g;for(g=0;g<a.length;g++){1!==a[g][0]&&(c+=a[g][1].length);-1!==a[g][0]&&(d+=a[g][1].length);if(c>b)break;e=c;f=d}return a.length!=g&&-1===a[g][0]?f:f+(b-e)};
diff_match_patch.prototype.diff_prettyHtml=function(a){for(var b=[],c=/&/g,d=/</g,e=/>/g,f=/\n/g,g=0;g<a.length;g++){var h=a[g][0],j=a[g][1],j=j.replace(c,"&amp;").replace(d,"&lt;").replace(e,"&gt;").replace(f,"&para;<br>");switch(h){case 1:b[g]='<ins style="background:#e6ffe6;">'+j+"</ins>";break;case -1:b[g]='<del style="background:#ffe6e6;">'+j+"</del>";break;case 0:b[g]="<span>"+j+"</span>"}}return b.join("")};
diff_match_patch.prototype.diff_text1=function(a){for(var b=[],c=0;c<a.length;c++)1!==a[c][0]&&(b[c]=a[c][1]);return b.join("")};diff_match_patch.prototype.diff_text2=function(a){for(var b=[],c=0;c<a.length;c++)-1!==a[c][0]&&(b[c]=a[c][1]);return b.join("")};diff_match_patch.prototype.diff_levenshtein=function(a){for(var b=0,c=0,d=0,e=0;e<a.length;e++){var f=a[e][0],g=a[e][1];switch(f){case 1:c+=g.length;break;case -1:d+=g.length;break;case 0:b+=Math.max(c,d),d=c=0}}return b+=Math.max(c,d)};
diff_match_patch.prototype.diff_toDelta=function(a){for(var b=[],c=0;c<a.length;c++)switch(a[c][0]){case 1:b[c]="+"+encodeURI(a[c][1]);break;case -1:b[c]="-"+a[c][1].length;break;case 0:b[c]="="+a[c][1].length}return b.join("\t").replace(/%20/g," ")};
diff_match_patch.prototype.diff_fromDelta=function(a,b){for(var c=[],d=0,e=0,f=b.split(/\t/g),g=0;g<f.length;g++){var h=f[g].substring(1);switch(f[g].charAt(0)){case "+":try{c[d++]=[1,decodeURI(h)]}catch(j){throw Error("Illegal escape in diff_fromDelta: "+h);}break;case "-":case "=":var i=parseInt(h,10);if(isNaN(i)||0>i)throw Error("Invalid number in diff_fromDelta: "+h);h=a.substring(e,e+=i);"="==f[g].charAt(0)?c[d++]=[0,h]:c[d++]=[-1,h];break;default:if(f[g])throw Error("Invalid diff operation in diff_fromDelta: "+
f[g]);}}if(e!=a.length)throw Error("Delta length ("+e+") does not equal source text length ("+a.length+").");return c};diff_match_patch.prototype.match_main=function(a,b,c){if(null==a||null==b||null==c)throw Error("Null input. (match_main)");c=Math.max(0,Math.min(c,a.length));return a==b?0:a.length?a.substring(c,c+b.length)==b?c:this.match_bitap_(a,b,c):-1};
diff_match_patch.prototype.match_bitap_=function(a,b,c){function d(a,d){var e=a/b.length,g=Math.abs(c-d);return!f.Match_Distance?g?1:e:e+g/f.Match_Distance}if(b.length>this.Match_MaxBits)throw Error("Pattern too long for this browser.");var e=this.match_alphabet_(b),f=this,g=this.Match_Threshold,h=a.indexOf(b,c);-1!=h&&(g=Math.min(d(0,h),g),h=a.lastIndexOf(b,c+b.length),-1!=h&&(g=Math.min(d(0,h),g)));for(var j=1<<b.length-1,h=-1,i,k,p=b.length+a.length,q,s=0;s<b.length;s++){i=0;for(k=p;i<k;)d(s,c+
k)<=g?i=k:p=k,k=Math.floor((p-i)/2+i);p=k;i=Math.max(1,c-k+1);var o=Math.min(c+k,a.length)+b.length;k=Array(o+2);for(k[o+1]=(1<<s)-1;o>=i;o--){var v=e[a.charAt(o-1)];k[o]=0===s?(k[o+1]<<1|1)&v:(k[o+1]<<1|1)&v|(q[o+1]|q[o])<<1|1|q[o+1];if(k[o]&j&&(v=d(s,o-1),v<=g))if(g=v,h=o-1,h>c)i=Math.max(1,2*c-h);else break}if(d(s+1,c)>g)break;q=k}return h};
diff_match_patch.prototype.match_alphabet_=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=0;for(c=0;c<a.length;c++)b[a.charAt(c)]|=1<<a.length-c-1;return b};
diff_match_patch.prototype.patch_addContext_=function(a,b){if(0!=b.length){for(var c=b.substring(a.start2,a.start2+a.length1),d=0;b.indexOf(c)!=b.lastIndexOf(c)&&c.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)d+=this.Patch_Margin,c=b.substring(a.start2-d,a.start2+a.length1+d);d+=this.Patch_Margin;(c=b.substring(a.start2-d,a.start2))&&a.diffs.unshift([0,c]);(d=b.substring(a.start2+a.length1,a.start2+a.length1+d))&&a.diffs.push([0,d]);a.start1-=c.length;a.start2-=c.length;a.length1+=
c.length+d.length;a.length2+=c.length+d.length}};
diff_match_patch.prototype.patch_make=function(a,b,c){var d;if("string"==typeof a&&"string"==typeof b&&"undefined"==typeof c)d=a,b=this.diff_main(d,b,!0),2<b.length&&(this.diff_cleanupSemantic(b),this.diff_cleanupEfficiency(b));else if(a&&"object"==typeof a&&"undefined"==typeof b&&"undefined"==typeof c)b=a,d=this.diff_text1(b);else if("string"==typeof a&&b&&"object"==typeof b&&"undefined"==typeof c)d=a;else if("string"==typeof a&&"string"==typeof b&&c&&"object"==typeof c)d=a,b=c;else throw Error("Unknown call format to patch_make.");
if(0===b.length)return[];for(var c=[],a=new diff_match_patch.patch_obj,e=0,f=0,g=0,h=d,j=0;j<b.length;j++){var i=b[j][0],k=b[j][1];if(!e&&0!==i)a.start1=f,a.start2=g;switch(i){case 1:a.diffs[e++]=b[j];a.length2+=k.length;d=d.substring(0,g)+k+d.substring(g);break;case -1:a.length1+=k.length;a.diffs[e++]=b[j];d=d.substring(0,g)+d.substring(g+k.length);break;case 0:k.length<=2*this.Patch_Margin&&e&&b.length!=j+1?(a.diffs[e++]=b[j],a.length1+=k.length,a.length2+=k.length):k.length>=2*this.Patch_Margin&&
e&&(this.patch_addContext_(a,h),c.push(a),a=new diff_match_patch.patch_obj,e=0,h=d,f=g)}1!==i&&(f+=k.length);-1!==i&&(g+=k.length)}e&&(this.patch_addContext_(a,h),c.push(a));return c};diff_match_patch.prototype.patch_deepCopy=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c],e=new diff_match_patch.patch_obj;e.diffs=[];for(var f=0;f<d.diffs.length;f++)e.diffs[f]=d.diffs[f].slice();e.start1=d.start1;e.start2=d.start2;e.length1=d.length1;e.length2=d.length2;b[c]=e}return b};
diff_match_patch.prototype.patch_apply=function(a,b){if(0==a.length)return[b,[]];var a=this.patch_deepCopy(a),c=this.patch_addPadding(a),b=c+b+c;this.patch_splitMax(a);for(var d=0,e=[],f=0;f<a.length;f++){var g=a[f].start2+d,h=this.diff_text1(a[f].diffs),j,i=-1;if(h.length>this.Match_MaxBits){if(j=this.match_main(b,h.substring(0,this.Match_MaxBits),g),-1!=j&&(i=this.match_main(b,h.substring(h.length-this.Match_MaxBits),g+h.length-this.Match_MaxBits),-1==i||j>=i))j=-1}else j=this.match_main(b,h,g);
if(-1==j)e[f]=!1,d-=a[f].length2-a[f].length1;else if(e[f]=!0,d=j-g,g=-1==i?b.substring(j,j+h.length):b.substring(j,i+this.Match_MaxBits),h==g)b=b.substring(0,j)+this.diff_text2(a[f].diffs)+b.substring(j+h.length);else if(g=this.diff_main(h,g,!1),h.length>this.Match_MaxBits&&this.diff_levenshtein(g)/h.length>this.Patch_DeleteThreshold)e[f]=!1;else{this.diff_cleanupSemanticLossless(g);for(var h=0,k,i=0;i<a[f].diffs.length;i++){var p=a[f].diffs[i];0!==p[0]&&(k=this.diff_xIndex(g,h));1===p[0]?b=b.substring(0,
j+k)+p[1]+b.substring(j+k):-1===p[0]&&(b=b.substring(0,j+k)+b.substring(j+this.diff_xIndex(g,h+p[1].length)));-1!==p[0]&&(h+=p[1].length)}}}b=b.substring(c.length,b.length-c.length);return[b,e]};
diff_match_patch.prototype.patch_addPadding=function(a){for(var b=this.Patch_Margin,c="",d=1;d<=b;d++)c+=String.fromCharCode(d);for(d=0;d<a.length;d++)a[d].start1+=b,a[d].start2+=b;var d=a[0],e=d.diffs;if(0==e.length||0!=e[0][0])e.unshift([0,c]),d.start1-=b,d.start2-=b,d.length1+=b,d.length2+=b;else if(b>e[0][1].length){var f=b-e[0][1].length;e[0][1]=c.substring(e[0][1].length)+e[0][1];d.start1-=f;d.start2-=f;d.length1+=f;d.length2+=f}d=a[a.length-1];e=d.diffs;0==e.length||0!=e[e.length-1][0]?(e.push([0,
c]),d.length1+=b,d.length2+=b):b>e[e.length-1][1].length&&(f=b-e[e.length-1][1].length,e[e.length-1][1]+=c.substring(0,f),d.length1+=f,d.length2+=f);return c};
diff_match_patch.prototype.patch_splitMax=function(a){for(var b=this.Match_MaxBits,c=0;c<a.length;c++)if(!(a[c].length1<=b)){var d=a[c];a.splice(c--,1);for(var e=d.start1,f=d.start2,g="";0!==d.diffs.length;){var h=new diff_match_patch.patch_obj,j=!0;h.start1=e-g.length;h.start2=f-g.length;if(""!==g)h.length1=h.length2=g.length,h.diffs.push([0,g]);for(;0!==d.diffs.length&&h.length1<b-this.Patch_Margin;){var g=d.diffs[0][0],i=d.diffs[0][1];1===g?(h.length2+=i.length,f+=i.length,h.diffs.push(d.diffs.shift()),
j=!1):-1===g&&1==h.diffs.length&&0==h.diffs[0][0]&&i.length>2*b?(h.length1+=i.length,e+=i.length,j=!1,h.diffs.push([g,i]),d.diffs.shift()):(i=i.substring(0,b-h.length1-this.Patch_Margin),h.length1+=i.length,e+=i.length,0===g?(h.length2+=i.length,f+=i.length):j=!1,h.diffs.push([g,i]),i==d.diffs[0][1]?d.diffs.shift():d.diffs[0][1]=d.diffs[0][1].substring(i.length))}g=this.diff_text2(h.diffs);g=g.substring(g.length-this.Patch_Margin);i=this.diff_text1(d.diffs).substring(0,this.Patch_Margin);""!==i&&
(h.length1+=i.length,h.length2+=i.length,0!==h.diffs.length&&0===h.diffs[h.diffs.length-1][0]?h.diffs[h.diffs.length-1][1]+=i:h.diffs.push([0,i]));j||a.splice(++c,0,h)}}};diff_match_patch.prototype.patch_toText=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=a[c];return b.join("")};
diff_match_patch.prototype.patch_fromText=function(a){var b=[];if(!a)return b;for(var a=a.split("\n"),c=0,d=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;c<a.length;){var e=a[c].match(d);if(!e)throw Error("Invalid patch string: "+a[c]);var f=new diff_match_patch.patch_obj;b.push(f);f.start1=parseInt(e[1],10);""===e[2]?(f.start1--,f.length1=1):"0"==e[2]?f.length1=0:(f.start1--,f.length1=parseInt(e[2],10));f.start2=parseInt(e[3],10);""===e[4]?(f.start2--,f.length2=1):"0"==e[4]?f.length2=0:(f.start2--,f.length2=
parseInt(e[4],10));for(c++;c<a.length;){e=a[c].charAt(0);try{var g=decodeURI(a[c].substring(1))}catch(h){throw Error("Illegal escape in patch_fromText: "+g);}if("-"==e)f.diffs.push([-1,g]);else if("+"==e)f.diffs.push([1,g]);else if(" "==e)f.diffs.push([0,g]);else if("@"==e)break;else if(""!==e)throw Error('Invalid patch mode "'+e+'" in: '+g);c++}}return b};diff_match_patch.patch_obj=function(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0};
diff_match_patch.patch_obj.prototype.toString=function(){var a,b;a=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1;b=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2;a=["@@ -"+a+" +"+b+" @@\n"];var c;for(b=0;b<this.diffs.length;b++){switch(this.diffs[b][0]){case 1:c="+";break;case -1:c="-";break;case 0:c=" "}a[b+1]=c+encodeURI(this.diffs[b][1])+"\n"}return a.join("").replace(/%20/g," ")};
this.diff_match_patch=diff_match_patch;this.DIFF_DELETE=-1;this.DIFF_INSERT=1;this.DIFF_EQUAL=0;})()
;
define("external/diff-match-patch/diff_match_patch", (function (global) {
    return function () {
        return global.diff_match_patch;
    }
}(this)));



/*global diff_match_patch:true, DIFF_INSERT:true, DIFF_DELETE:true, DIFF_EQUAL:true */
/*jshint newcap:false */

// This wraps the diff-match-patch library to provide diffs and edit distances

define('src/diff',['external/diff-match-patch/diff_match_patch'], function (diff_match_patch) {
	var dmp = new diff_match_patch();

	dmp.Diff_Timeout = 0.003; // Very low, increase if too inaccurate.
	                          // Unfortunately I couldn't find a way
	                          // to do this which was determinitic,
	                          // this method could produce different
	                          // results depending on the machine speed.
	
	/**
	 * Modified version of the diff-match-patch function which
	 * doesn't escape the original HTML tags
	 * (There's a risk now of mangling the tags)
	 *  
	 * Convert a diff array into a pretty HTML report.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} HTML representation.
	 */
	var prettyHtml = function (diffs) {
		var html = [];
		var pattern_amp = /&/g;
		var pattern_lt = /</g;
		var pattern_gt = />/g;
		var pattern_para = /\n/g;
		var x = 0;

		for (x = 0; x < diffs.length; x++) {
			var op = diffs[x][0];    // Operation (insert, delete, equal)
			var data = diffs[x][1];  // Text of change.
			var text = data;//.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
			switch (op) {
			case DIFF_INSERT:
				html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
				break;
			case DIFF_DELETE:
				html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
				break;
			case DIFF_EQUAL:
				html[x] = '<span>' + text + '</span>';
				break;
			}
		}
		return html.join('');
	};

	// Returns a pretty formatted HTML diff of the given strings
	var prettyHtmlDiff = function (oldString, newString) {
		var diffs = dmp.diff_main(oldString, newString);
		dmp.diff_cleanupSemantic(diffs);
		return prettyHtml(diffs);
	};

	// Returns the edit distance between the given strings
	var editDistance = function (oldString, newString) {
		var diffs;
		diffs = dmp.diff_main(oldString, newString);
		return dmp.diff_levenshtein(diffs);
	};

	// Human friendly value from 0 to 100 to use as a match percentage
	//
	// Based on the edit distance between oldString and newString
	//
	// 0 means no characters match
	// 100 means all characters match
	var matchQuality = function (oldString, newString) {
		var thisEditDistance = editDistance(oldString, newString),
			matchQuality = Math.max(0, Math.floor(100 * (1.0 - thisEditDistance /
				Math.max(oldString.length, newString.length))));

		return matchQuality;
	};

	return {
		prettyHtml : prettyHtml,
		prettyHtmlDiff : prettyHtmlDiff,
		matchQuality : matchQuality
	};
});



// Creates the Sys object required by citeproc-js
// 
// Provides citeproc with:
//
// - Metadata for all the JSON references used in the citation clusters
// - Locale data
// - Abbreviation data

define('src/citeprocLoadSys',[	'src/urlUtils',
			'src/debug'
		],
		function (
			CSLEDIT_urlUtils,
			debug
		) {

	// Sys constructor
	var Sys = function () {
		this.locale = {}; // lazily fetched from server
		this.abbreviations = {}; // no journal abbreviations at the moment
								// see demo/loadabbres.js in citeproc-js repo for an example
	};

	// Fetches and returns the locale for the given language,
	// or falls back to "en-US" if not available
	Sys.prototype.retrieveLocale = function (lang) {
		var that = this,
			locale = this.locale[lang],
			localePath;

		if (typeof(locale) === "undefined") {
			localePath = CSLEDIT_urlUtils.getResourceUrl("external/locales/locales-" + lang + ".xml");

			// try to fetch from server
			$.ajax({
				url : localePath,
				success : function (data) {
					debug.log("fetched locale data for " + lang);
					that.locale[lang] = data;
					locale = data;
				},
				error : function (jqXHR, textStatus) {
					debug.log("ERROR retrieving locale data for " + lang);
					debug.log("Falling back to en-US");

					locale = that.retrieveLocale("en-US");
				},
				dataType : "text",
				async : false
			});
		}
		
		return locale;
	};

	// Set the list of abbreviations
	Sys.prototype.setAbbreviations = function (abbreviations) {
		this.abbreviations = abbreviations;
	};

	// Set the list of JSON documents (all the references used in the citation clusters)
	Sys.prototype.setJsonDocuments = function (jsonDocuments) {
		this.jsonDocuments = jsonDocuments;
	};

	// Returns the JSON document at the given index
	Sys.prototype.retrieveItem = function (index) {
		return this.jsonDocuments[index];
	};

	// Returns the appropriate abbreviation
	Sys.prototype.getAbbreviations = function (name, vartype) {
		return this.abbreviations[name][vartype];
	};

	return new Sys();
});

/*
 * Copyright (c) 2009, 2010 and 2011 Frank G. Bennett, Jr. All Rights
 * Reserved.
 *
 * The contents of this file are subject to the Common Public
 * Attribution License Version 1.0 (the “License”); you may not use
 * this file except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://bitbucket.org/fbennett/citeproc-js/src/tip/LICENSE.
 *
 * The License is based on the Mozilla Public License Version 1.1 but
 * Sections 14 and 15 have been added to cover use of software over a
 * computer network and provide for limited attribution for the
 * Original Developer. In addition, Exhibit A has been modified to be
 * consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an “AS IS”
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is the citation formatting software known as
 * "citeproc-js" (an implementation of the Citation Style Language
 * [CSL]), including the original test fixtures and software located
 * under the ./std subdirectory of the distribution archive.
 *
 * The Original Developer is not the Initial Developer and is
 * __________. If left blank, the Original Developer is the Initial
 * Developer.
 *
 * The Initial Developer of the Original Code is Frank G. Bennett,
 * Jr. All portions of the code written by Frank G. Bennett, Jr. are
 * Copyright (c) 2009, 2010 and 2011 Frank G. Bennett, Jr. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the
 * terms of the GNU Affero General Public License (the [AGPLv3]
 * License), in which case the provisions of [AGPLv3] License are
 * applicable instead of those above. If you wish to allow use of your
 * version of this file only under the terms of the [AGPLv3] License
 * and not to allow others to use your version of this file under the
 * CPAL, indicate your decision by deleting the provisions above and
 * replace them with the notice and other provisions required by the
 * [AGPLv3] License. If you do not delete the provisions above, a
 * recipient may use your version of this file under either the CPAL
 * or the [AGPLv3] License.”
 */
var CSL_IS_IE;
var CSL_CHROME = function () {
    if ("undefined" == typeof DOMParser || CSL_IS_IE) {
        CSL_IS_IE = true;
        DOMParser = function() {};
        DOMParser.prototype.parseFromString = function(str, contentType) {
            if ("undefined" != typeof ActiveXObject) {
                var xmldata = new ActiveXObject('MSXML.DomDocument');
                xmldata.async = false;
                xmldata.loadXML(str);
                return xmldata;
            } else if ("undefined" != typeof XMLHttpRequest) {
                var xmldata = new XMLHttpRequest;
                if (!contentType) {
                    contentType = 'text/xml';
                }
                xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
                if(xmldata.overrideMimeType) {
                    xmldata.overrideMimeType(contentType);
                }
                xmldata.send(null);
                return xmldata.responseXML;
            }
        };
        this.hasAttributes = function (node) {
            var ret;
            if (node.attributes && node.attributes.length) {
                ret = true;
            } else {
                ret = false;
            }
            return ret;
        };
    } else {
        this.hasAttributes = function (node) {
            var ret;
            if (node.attributes && node.attributes.length) {
                ret = true;
            } else {
                ret = false;
            }
            return ret;
        };
    }
    this.importNode = function (doc, srcElement) {
        if ("undefined" == typeof doc.importNode) {
            var ret = this._importNode(doc, srcElement, true);
        } else {
            var ret = doc.importNode(srcElement, true);
        }
        return ret;
    };
    this._importNode = function(doc, node, allChildren) {
        switch (node.nodeType) {
            case 1:
                var newNode = doc.createElement(node.nodeName);
                if (node.attributes && node.attributes.length > 0)
                    for (var i = 0, il = node.attributes.length; i < il;)
                        newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i++].nodeName));
                    if (allChildren && node.childNodes && node.childNodes.length > 0)
                        for (var i = 0, il = node.childNodes.length; i < il;)
                            newNode.appendChild(this._importNode(doc, node.childNodes[i++], allChildren));
                return newNode;
                break;
            case 3:
            case 4:
            case 8:
        }
    };
    this.parser = new DOMParser();
    var str = "<docco><institution institution-parts=\"long\" delimiter=\", \" substitute-use-first=\"1\" use-last=\"1\"><institution-part name=\"long\"/></institution></docco>";
    var inst_doc = this.parser.parseFromString(str, "text/xml");
    var inst_node = inst_doc.getElementsByTagName("institution");
    this.institution = inst_node.item(0);
    var inst_part_node = inst_doc.getElementsByTagName("institution-part");
    this.institutionpart = inst_part_node.item(0);
    this.ns = "http://purl.org/net/xbiblio/csl";
};
CSL_CHROME.prototype.clean = function (xml) {
    xml = xml.replace(/<\?[^?]+\?>/g, "");
    xml = xml.replace(/<![^>]+>/g, "");
    xml = xml.replace(/^\s+/, "");
    xml = xml.replace(/\s+$/, "");
    xml = xml.replace(/^\n*/, "");
    return xml;
};
CSL_CHROME.prototype.getStyleId = function (myxml) {
    var text = "";
    var node = myxml.getElementsByTagName("id");
    if (node && node.length) {
        node = node.item(0);
    }
    if (node) {
        text = node.textContent;
    }
    if (!text) {
        text = node.innerText;
    }
    if (!text) {
        text = node.innerHTML;
    }
    return text;
};
CSL_CHROME.prototype.children = function (myxml) {
    var children, pos, len, ret;
    if (myxml) {
        ret = [];
        children = myxml.childNodes;
        for (pos = 0, len = children.length; pos < len; pos += 1) {
            if (children[pos].nodeName != "#text") {
                ret.push(children[pos]);
            }
        }
        return ret;
    } else {
        return [];
    }
};
CSL_CHROME.prototype.nodename = function (myxml) {
    var ret = myxml.nodeName;
    return ret;
};
CSL_CHROME.prototype.attributes = function (myxml) {
    var ret, attrs, attr, key, xml, pos, len;
    ret = new Object();
    if (myxml && this.hasAttributes(myxml)) {
        attrs = myxml.attributes;
        for (pos = 0, len=attrs.length; pos < len; pos += 1) {
            attr = attrs[pos];
            ret["@" + attr.name] = attr.value;
        }
    }
    return ret;
};
CSL_CHROME.prototype.content = function (myxml) {
    var ret;
    if ("undefined" != typeof myxml.textContent) {
        ret = myxml.textContent;
    } else if ("undefined" != typeof myxml.innerText) {
        ret = myxml.innerText;
    } else {
        ret = myxml.txt;
    }
    return ret;
};
CSL_CHROME.prototype.namespace = {
    "xml":"http://www.w3.org/XML/1998/namespace"
}
CSL_CHROME.prototype.numberofnodes = function (myxml) {
    if (myxml) {
        return myxml.length;
    } else {
        return 0;
    }
};
CSL_CHROME.prototype.getAttributeName = function (attr) {
    var ret = attr.name;
    return ret;
}
CSL_CHROME.prototype.getAttributeValue = function (myxml,name,namespace) {
    var ret = "";
    if (myxml && this.hasAttributes(myxml) && myxml.getAttribute(name)) {
        ret = myxml.getAttribute(name);
    }
    return ret;
}
CSL_CHROME.prototype.getNodeValue = function (myxml,name) {
    var ret = "";
    if (name){
        var vals = myxml.getElementsByTagName(name);
        if (vals.length > 0) {
            if ("undefined" != typeof vals[0].textContent) {
                ret = vals[0].textContent;
            } else if ("undefined" != typeof vals[0].innerText) {
                ret = vals[0].innerText;
            } else {
                ret = vals[0].text;
            }
        }
    } else {
        ret = myxml;
    }
    if (ret && ret.childNodes && (ret.childNodes.length == 0 || (ret.childNodes.length == 1 && ret.firstChild.nodeName == "#text"))) {
        if ("undefined" != typeof ret.textContent) {
            ret = ret.textContent;
        } else if ("undefined" != typeof ret.innerText) {
            ret = ret.innerText;
        } else {
            ret = ret.text;
        }
    }
    return ret;
}
CSL_CHROME.prototype.setAttributeOnNodeIdentifiedByNameAttribute = function (myxml,nodename,partname,attrname,val) {
    var pos, len, xml, nodes, node;
    if (attrname.slice(0,1) === '@'){
        attrname = attrname.slice(1);
    }
    nodes = myxml.getElementsByTagName(nodename);
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes[pos];
        if (node.getAttribute("name") != partname) {
            continue;
        }
        node.setAttribute(attrname, val);
    }
}
CSL_CHROME.prototype.deleteNodeByNameAttribute = function (myxml,val) {
    var pos, len, node, nodes;
    nodes = myxml.childNodes;
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes[pos];
        if (!node || node.nodeType == node.TEXT_NODE) {
            continue;
        }
        if (this.hasAttributes(node) && node.getAttribute("name") == val) {
            myxml.removeChild(nodes[pos]);
        }
    }
}
CSL_CHROME.prototype.deleteAttribute = function (myxml,attr) {
    myxml.removeAttribute(attr);
}
CSL_CHROME.prototype.setAttribute = function (myxml,attr,val) {
    var attribute;
    if (!myxml.ownerDocument) {
        myxml = myxml.firstChild;
    }
    attribute = myxml.ownerDocument.createAttribute(attr);
    myxml.setAttribute(attr, val);
    return false;
}
CSL_CHROME.prototype.nodeCopy = function (myxml) {
    var cloned_node = myxml.cloneNode(true);
    return cloned_node;
}
CSL_CHROME.prototype.getNodesByName = function (myxml,name,nameattrval) {
    var ret, nodes, node, pos, len;
    ret = [];
    nodes = myxml.getElementsByTagName(name);
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes.item(pos);
        if (nameattrval && !(this.hasAttributes(node) && node.getAttribute("name") == nameattrval)) {
            continue;
        }
        ret.push(node);
    }
    return ret;
}
CSL_CHROME.prototype.nodeNameIs = function (myxml,name) {
    if (name == myxml.nodeName) {
        return true;
    }
    return false;
}
CSL_CHROME.prototype.makeXml = function (myxml) {
    var ret, topnode;
    if (!myxml) {
        myxml = "<docco><bogus/></docco>";
    }
    myxml = myxml.replace(/\s*<\?[^>]*\?>\s*\n*/g, "");
    var nodetree = this.parser.parseFromString(myxml, "application/xml");
    return nodetree.firstChild;
};
CSL_CHROME.prototype.insertChildNodeAfter = function (parent,node,pos,datexml) {
    var myxml, xml;
    myxml = this.importNode(node.ownerDocument, datexml);
    parent.replaceChild(myxml, node);
     return parent;
};
CSL_CHROME.prototype.insertPublisherAndPlace = function(myxml) {
    var group = myxml.getElementsByTagName("group");
    for (var i = 0, ilen = group.length; i < ilen; i += 1) {
        var node = group.item(i);
        var skippers = [];
        for (var j = 0, jlen = node.childNodes.length; j < jlen; j += 1) {
            if (node.childNodes.item(j).nodeType !== 1) {
                skippers.push(j);
            }
        }
        if (node.childNodes.length - skippers.length === 2) {
            var twovars = [];
            for (var j = 0, jlen = 2; j < jlen; j += 1) {
                if (skippers.indexOf(j) > -1) {
                    continue;
                }
                var child = node.childNodes.item(j);                    
                var subskippers = [];
                for (var k = 0, klen = child.childNodes.length; k < klen; k += 1) {
                    if (child.childNodes.item(k).nodeType !== 1) {
                        subskippers.push(k);
                    }
                }
                if (child.childNodes.length - subskippers.length === 0) {
                    twovars.push(child.getAttribute('variable'));
                    if (child.getAttribute('suffix')
                        || child.getAttribute('prefix')) {
                        twovars = [];
                        break;
                    }
                }
            }
            if (twovars.indexOf("publisher") > -1 && twovars.indexOf("publisher-place") > -1) {
                node.setAttribute('has-publisher-and-publisher-place', true);
            }
        }
    }
};
CSL_CHROME.prototype.addMissingNameNodes = function(myxml) {
    var nameslist = myxml.getElementsByTagName("names");
    for (var i = 0, ilen = nameslist.length; i < ilen; i += 1) {
        var names = nameslist.item(i);
        var namelist = names.getElementsByTagName("name");
        if ((!namelist || namelist.length === 0)
            && names.parentNode.tagName.toLowerCase() !== "substitute") {
            var doc = names.ownerDocument;
            var name = doc.createElement("name");
            names.appendChild(name);
        }
    }
};
CSL_CHROME.prototype.addInstitutionNodes = function(myxml) {
    var names, thenames, institution, theinstitution, name, thename, xml, pos, len;
    names = myxml.getElementsByTagName("names");
    for (pos = 0, len = names.length; pos < len; pos += 1) {
        thenames = names.item(pos);
        name = thenames.getElementsByTagName("name");
        if (name.length == 0) {
            continue;
        }
        institution = thenames.getElementsByTagName("institution");
        if (institution.length == 0) {
            theinstitution = this.importNode(myxml.ownerDocument, this.institution);
            theinstitutionpart = theinstitution.getElementsByTagName("institution-part").item(0);
            thename = name.item(0);
            thenames.insertBefore(theinstitution, thename.nextSibling);
            for (var j = 0, jlen = CSL.INSTITUTION_KEYS.length; j < jlen; j += 1) {
                var attrname = CSL.INSTITUTION_KEYS[j];
                var attrval = thename.getAttribute(attrname);
                if (attrval) {
                    theinstitutionpart.setAttribute(attrname, attrval);
                }
            }
            var nameparts = thename.getElementsByTagName("name-part");
            for (var j = 0, jlen = nameparts.length; j < jlen; j += 1) {
                if ('family' === nameparts[j].getAttribute('name')) {
                    for (var k = 0, klen = CSL.INSTITUTION_KEYS.length; k < klen; k += 1) {
                        var attrname = CSL.INSTITUTION_KEYS[k];
                        var attrval = nameparts[j].getAttribute(attrname);
                        if (attrval) {
                            theinstitutionpart.setAttribute(attrname, attrval);
                        }
                    }
                }
            }
        }
    }
};
CSL_CHROME.prototype.flagDateMacros = function(myxml) {
    var pos, len, thenode, thedate;
    nodes = myxml.getElementsByTagName("macro");
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        thenode = nodes.item(pos);
        thedate = thenode.getElementsByTagName("date");
        if (thedate.length) {
            thenode.setAttribute('macro-has-date', 'true');
        }
    }
};

this.CSL_CHROME = CSL_CHROME;

define("external/citeproc/xmldom", (function (global) {
    return function () {
        return global.CSL_CHROME;
    }
}(this)));



// Uses citeproc-js to generate example citaitons

define('src/citationEngine',[	'src/options',
			'src/exampleCitations',
			'src/diff',
			'src/debug',
			'src/citeprocLoadSys',
			'external/citeproc/citeproc',
			'jquery'
		],
		function (
			CSLEDIT_options,
			CSLEDIT_exampleCitations,
			CSLEDIT_diff,
			debug,
			citeprocSys,
			CSL,
			$
		) {
	var oldFormattedCitation = "",
		newFormattedCitation = "",
		oldFormattedBibliography = "",
		newFormattedBibliography = "",
		diffTimeout,
		dmp = null, // for diff_match_patch object
		previousStyle = "", // to skip initializing citeproc when using the same style
		citeproc;

	// Remove the tags with the given tagName from the given html and return the result
	//
	// The contents of the removed tags are retained
	var stripTags = function (html, tagName) {
		var stripRegExp = new RegExp("<" + tagName + ".*?>|</\\s*" + tagName + "\\s*?>", "g");

		// creating new string because of bug where some html from generateExampleCitations.js
		// was type object instead of string and didn't have the replace() function
		var stripped = html.toString();
		stripped = stripped.replace(stripRegExp, "");
		return stripped;
	};

	// Formats the given citationClusters, containing the given documents, in the given
	// style
	//
	// If taggedOutput is true, the output will contain <span cslid=???> tags where the cslid
	// attribute points to the input CSL node responsible for that part of the output
	//
	// Returns a result containing the following properties:
	//
	// - statusMessage - used for errors, if everything went well, this will be an empty string
	// - formattedCitations - a list of formatted inline citation strings
	// - formattedBibliography - the formatted bibliography string
	var formatCitations = function (style, documents, citationClusters, taggedOutput) {
		var bibliography,
			result,
			citations,
			inLineCitations,
			inLineCitationArray,
			pos,
			makeBibliographyArgument,
			enumerateCitations;

		citeprocSys.setJsonDocuments(documents);
		citeprocSys.csl_reverse_lookup_support = true;

		result = { "statusMessage": "", "formattedCitations": [], "formattedBibliography": [] };
		result.statusMessage = "";
		if (style !== previousStyle) {
			try {
				citeproc = new CSL.Engine(citeprocSys, style);
				previousStyle = style;
			}
			catch (err) {
				result.statusMessage = "Citeproc initialisation exception: " + err;
				return result;
			}
		} else {
			citeproc.restoreProcessorState([]);
		}
		
		inLineCitations = "";
		inLineCitationArray = [];
		
		$.each(citationClusters, function (clusterIndex, cluster) {
			if (cluster.citationItems.length === 0) {
				return;
			}
			try {
				citations = citeproc.appendCitationCluster(cluster, false);
			}
			catch (err) {
				result.statusMessage = "Citeproc exception: " + err;
				return false;
			}
			
			$.each(citations, function (i, citation) {
				pos = citation[0];
				
				if (inLineCitations !== "")
				{
					inLineCitations += "<br>";
				}
				
				if (taggedOutput !== true) {
					citation[1] = stripTags(citation[1], "span");
				}

				inLineCitations += citation[1];

				if (citation[1] !== "") {
					inLineCitationArray.push(citation[1]);
				}
			});
		});
		if (result.statusMessage !== "") {
			return result;
		}
		result.formattedCitations = inLineCitationArray;
		
		enumerateCitations = true;
		if (enumerateCitations === true) {
			makeBibliographyArgument = undefined;
		}
		else {
			makeBibliographyArgument = "citation-number";
		}
		
		try {
			bibliography = citeproc.makeBibliography(makeBibliographyArgument);
		}
		catch (err) {
			result.statusMessage = "Citeproc exception: " + err;
			return result;
		}

		if (bibliography !== false) {
			if ("hangingindent" in bibliography[0]) {
				result.hangingIndent = bibliography[0].hangingindent;
			}
			bibliography = bibliography[1];
		}
		else {
			bibliography = [[(citations[0][1])]];
		}

		if (taggedOutput !== true) {
			$.each(bibliography, function (i, entry) {
				bibliography[i] = stripTags(entry, "span");
			});
		}

		result.formattedBibliography = bibliography;
		return result;
	};

	// This function formats the current style in CSLEDIT_data and populates
	// the given elements with the output
	//
	// Note on diffs:
	//   There is currently unused code to show a diff for a second after each change.
	//   This can be enabled by adding 'showDiffOnChange' to the CSLEDIT_options via the
	//   CSLEDIT_VisualEditor or CSLEDIT_CodeEditor contructors.
	//
	//   It hasn't worked so well since adding the reverse lookup <span cslid=??> tags to
	//   the citeproc output.
	//
	//   Could be good to fix for use in the Code Editor, but not so essential for the Visual Editor.
	var runCiteprocAndDisplayOutput = function (
			data, statusOut, citationsOut, bibliographyOut, callback,
			exampleReferences, exampleCitations) {

		debug.time("runCiteprocAndDisplayOutput");

		var style = data.getCslCode(),
			inLineCitations = "",
			citations = [],
			formattedResult,
			citationTagStart = "",
			citationTagEnd = "",
			bibliographyTagStart = "",
			bibliographyTagEnd = "",
			startTime,
			citationDiffs,
			bibliographyDiffs,
			diffFormattedCitation,
			diffFormattedBibliography,
			cslData = data.get(),
			citationNode = data.getNodesFromPath("style/citation/layout", cslData),
			bibliographyNode = data.getNodesFromPath("style/bibliography/layout", cslData);

		statusOut.html("<i>Re-formatting citations...</i>");
	
		debug.time("formatCitations");

		exampleReferences = exampleReferences || CSLEDIT_exampleCitations.getCiteprocReferences();
		exampleCitations = exampleCitations || CSLEDIT_exampleCitations.getCitations();

		formattedResult = formatCitations(style, exampleReferences, exampleCitations, true);
		
		debug.timeEnd("formatCitations");

		statusOut.html(formattedResult.statusMessage);

		// add syntax highlighting at highest level
		if (citationNode.length > 0) {
			// wrap in outer div since the .inline-csl-entry one is an inline-block
			citationTagStart = 
				'<div class="csl-entry-container">' +
				'<div class="inline-csl-entry" cslid="' + citationNode[0].cslId + '">';
			citationTagEnd = '</div></div>';
		}
		if (bibliographyNode.length > 0) {
			bibliographyTagStart =
				'<div class="csl-entry-container">' +
				'<div class="bibliography-csl-entry" cslid="' + bibliographyNode[0].cslId + '">';
			bibliographyTagEnd = '</div></div>';
		}

		oldFormattedCitation = newFormattedCitation;
		newFormattedCitation = citationTagStart;
		newFormattedCitation += formattedResult.formattedCitations.join(
			citationTagEnd + citationTagStart);
		newFormattedCitation += citationTagEnd;

		oldFormattedBibliography = newFormattedBibliography;
		newFormattedBibliography = bibliographyTagStart;
		newFormattedBibliography += formattedResult.formattedBibliography.join(
			bibliographyTagEnd + bibliographyTagStart);
		newFormattedBibliography += bibliographyTagEnd;

		// lazy instantiation of diff_match_patch
		if (dmp === null) {
			dmp = new diff_match_patch();
		}

		citationDiffs =
			dmp.diff_main(stripTags(oldFormattedCitation, "span"), stripTags(newFormattedCitation, "span"));
		dmp.diff_cleanupSemantic(citationDiffs);
		diffFormattedCitation = unescape(CSLEDIT_diff.prettyHtml(citationDiffs));

		bibliographyDiffs =
			dmp.diff_main(stripTags(oldFormattedBibliography, "span"), stripTags(newFormattedBibliography, "span"));
		dmp.diff_cleanupSemantic(bibliographyDiffs);
		diffFormattedBibliography = unescape(CSLEDIT_diff.prettyHtml(bibliographyDiffs));

		if (dmp.diff_levenshtein(citationDiffs) === 0 && dmp.diff_levenshtein(bibliographyDiffs) === 0) {
			citationsOut.html(newFormattedCitation);
			bibliographyOut.html(newFormattedBibliography);
			if (typeof callback !== "undefined") {
				callback();
			}
		} else {
			if (CSLEDIT_options.get('showDiffOnChange') === true) {
				// display the diff
				citationsOut.html(diffFormattedCitation);
				bibliographyOut.html(diffFormattedBibliography);

				// display the new version in 1000ms
				clearTimeout(diffTimeout);
				diffTimeout = setTimeout(
					function () {
						citationsOut.html(newFormattedCitation);
						bibliographyOut.html(newFormattedBibliography);
						if (typeof callback !== "undefined") {
							callback();
						}
					},
				1000);
			} else {
				// display the real result
				citationsOut.html(newFormattedCitation);
				bibliographyOut.html(newFormattedBibliography);
				if (typeof callback !== "undefined") {
					callback();
				}
			}
		}

		if ("hangingIndent" in formattedResult) {
			bibliographyOut.find('.bibliography-csl-entry').css({
				"padding-left" : formattedResult.hangingIndent + "em",
				"text-indent" : "-" + formattedResult.hangingIndent + "em"
			});
		} else {
			bibliographyOut.find('.bibliography-csl-entry').css({
				"padding-left" : "0",
				"text-indent" : "0"
			});
		}
		
		debug.timeEnd("runCiteprocAndDisplayOutput");
	};

	// Public members:
	return {
		formatCitations : formatCitations,
		runCiteprocAndDisplayOutput : runCiteprocAndDisplayOutput
	};

});



// Wraps CSL node JSON objects and provides helpful functions to access thier attributes
//
// # CSL node JSON schema
//
// The CSL node JSON as used throughout the code has the following
// members, and is one-to-one map of the XML tree in the corresponding *.csl file:
//
// - name       - string, name of the XML node e.g. 'text', 'macro', 'layout', 'style'
// - textValue  - string, text contents of a childless XML node. e.g. the 'style/info/title' node
// - attributes - list, each element corresponds to an XML attribute and has the following members:
//     - key     - string
//     - value   - string
//     - enabled - boolean (optional, default is true), should the attribute be used in the output CSL
// - children   - list of child nodes, all of which follow this schema
// - cslId      - the zero-based index of this node within the whole tree, when traversed depth first

define('src/CslNode',['src/debug'], function (debug) {
	// CSLEDIT_CslNode constructor
	//
	// You can pass in a valid CSL node object, e.g.
	//     var node = new CSLEDIT_CslNode({
	//         name : "macro",
	//         attributes : [
	//             {
	//                 key : "name",
	//                 value : "author-short"
	//             }
	//         ],
	//         children : [],
	//         cslId : 54
	//     });
	//
	// or pass separate arguments, e.g.
	//     var node2 = new CSLEDIT_CslNode("macro", [{key: "name", value: "author-short"], [], 54);
	//
	// both are equivalent
	var CSLEDIT_CslNode = function (nameOrNode, attributes, children, cslId) {
		debug.assert(this instanceof CSLEDIT_CslNode);

		if (nameOrNode.hasOwnProperty("name")) {
			this._copy(nameOrNode);
			return;
		}

		this.name = nameOrNode;
		this.attributes = attributes || [];
		this.children = children || [];
		if (typeof cslId === "undefined") {
			this.cslId = -1;
		} else {
			this.cslId = cslId;
		}
	};

	// Creates a shallow copy of source
	CSLEDIT_CslNode.prototype._copy = function (source) {
		this.name = source.name;
		this.attributes = source.attributes;
		this.children = source.children;
		this.textValue = source.textValue;
		this.cslId = source.cslId;
	};

	// Set the given attribute to the given value
	CSLEDIT_CslNode.prototype.setAttr = function (attributeName, value) {
		var index;

		index = this._indexOfAttr(attributeName);

		if (index === -1) {
			this.attributes.push({key: attributeName, value: value, enabled: true});
		} else {
			this.attributes[index].value = value;
			this.attributes[index].enabled = true;
		}
	};

	// Enable the given attribute
	//
	// The reason to store the enabled state is so that the editor can remember the previous
	// value after the user either:
	//
	// 1. Clicks 'Disable'
	// 2. Changes the mode (CSLEDIT_schema.choices) of the node to one where a previously enabled
	//    attribute is no longer present
	//
	// In both these cases, the user can now change their mind and have the old attribute retained
	CSLEDIT_CslNode.prototype.setAttrEnabled = function (attributeName, enabled, defaultValue) {
		var index;

		defaultValue = defaultValue || "";

		index = this._indexOfAttr(attributeName);
		if (index === -1) {
			if (enabled) {
				this.attributes.push({
					key: attributeName,
					value: defaultValue,
					enabled: true
				});
				return;
			} else {
				// a non-existant attribute is equivalent to a disabled one
				return;
			}
		}
		this.attributes[index].enabled = enabled;
	};

	// Is the attribute with the given name present
	CSLEDIT_CslNode.prototype.hasAttr = function (attributeName) {
		var index = this._indexOfAttr(attributeName);
		return index !== -1 && this.attributes[index].enabled;
	};

	// Gets the attribute with the given attribute name
	CSLEDIT_CslNode.prototype.getAttr = function (attributeName) {
		var index;

		index = this._indexOfAttr(attributeName);

		if (index === -1 ||
				(this.attributes[index].hasOwnProperty('enabled') && !this.attributes[index].enabled)) {
			return "";
		} else {
			return this.attributes[index].value;
		}
	};

	// private function, returns -1 if can't find the attribute
	CSLEDIT_CslNode.prototype._indexOfAttr = function (attributeName) {
		var index = -1;
		$.each(this.attributes, function (i, attr) {
			if (attr.key === attributeName) {
				index = i;
				return false;
			}
		});
		return index;
	};

	return CSLEDIT_CslNode;
});



// Hard-coded configuration data used to populate the UI

define('src/uiConfig',
		[	'src/CslNode',
			'src/debug'
		], function (
			CSLEDIT_CslNode,
			debug
		) {
	var CSLEDIT_uiConfig = {};

	// Defines the contents of the Visual Editor tree view
	CSLEDIT_uiConfig.smartTreeSchema = [
		{
			id : "info",
			name : "Style Info",
			// TODO: Fix src/SmartTree so that the locale node can be added.
			//       At present there's a bug where adding a locale node doesn't
			//       put it in the tree because it's a child of the "style" node, and
			//       therefore part of that range.
			//       (note - not an issue for 'style/info' since the bug only affects
			//       nodes added during a session, and 'style/info' is a required node)
			//headingNodePath : "style",
			//headingNodePossibleChildren : {
			//	"locale" : "one"
			//},
			//headingNodeShowPropertyPanel : false,
			nodePaths : ["style/info", "style", /* "style/locale" */],
			macroLinks : false,
			leafNodes : ["info", "style"]
		},
		{
			id : "citations",
			name : "Inline Citations",
			headingNodePath : "style/citation",
			headingNodePossibleChildren : {
				"layout" : "one",
				"sort" : "one"
			},
			nodePaths : ["style/citation/layout", "style/citation/sort"],
			//leafNodes : ["sort"],
			macroLinks : true
		},
		{
			id : "bibliography",
			name : "Bibliography",
			headingNodePath : "style/bibliography",
			headingNodePossibleChildren : {
				"layout" : "one",
				"sort" : "one"
			},
			nodePaths : ["style/bibliography/layout", "style/bibliography/sort"],
			//leafNodes : ["sort"],
			macroLinks : true
		},
		{
			id : "macro",
			name : "Macros",
			headingNodePath : "style",
			headingNodePossibleChildren : {
				"macro" : "zeroOrMore"
			},
			headingNodeShowPropertyPanel : false,
			nodePaths : ["style/macro"],
			macroLinks : true,
		},
		{
			id : "locale",
			name : "Advanced",
			headingNodePath : "",
			macroLinks : false,
			nodePaths : ["style"]
		}
	];

	// If creating an empty node, populate with these attributes
	CSLEDIT_uiConfig.defaultAttributes = {
		"text" : {
			"value" : ""
		},
		"if" : {
			"type" : "article",
			"match" : "any"
		},
		"else-if" : {
			"type" : "article",
			"match" : "any"
		},
		"date" : {
			"form" : "text",
			"date-parts" : "year-month-day",
			"variable" : "issued"
		},
		"date-part" : {
			"name" : "year"
		},
		"key" : {
			"variable" : "author"
		}
	};

	// If creating an empty node, populate with these children
	CSLEDIT_uiConfig.defaultChildren = {
		"bibliography" : [
			{
				name: "layout",
				attributes: [],
				children: []
			}
		]
	};

	// Defines the different fieldsets within the genericPropertyPanel
	CSLEDIT_uiConfig.attributeGroups = {
		"Text formatting" : [
			"fontFormattingControls",
			"display",
			"text-case"
		],
		"Affixes" : [
			"prefix",
			"suffix",
			"delimiter"
		]
	};

	// For displaying the example metadata in Search by Example page
	CSLEDIT_uiConfig.fieldOrder = [
		"type",
		"title",
		"author",
		"editor",
		"translator",
		"issued",
		"container-title",
		"volume",
		"issue",
		"chapter",
		"page",
		"number-of-pages",
		"publisher"
	];

	// Add classes to the <input> or <select> elements for various attributes
	CSLEDIT_uiConfig.attributeClasses = {
		"delimiter" : "short",
		"display" : "exampleClass1 exampleClass2"
	};

	// The icons to use in the Visual Editor tree view
	CSLEDIT_uiConfig.nodeIcons = {
		"default" : "external/famfamfam-icons/bullet_black.png",
		"text" : "external/famfamfam-icons/style.png",
		"macro" : "external/famfamfam-icons/brick.png",
		"info" : "external/famfamfam-icons/information.png",
		"choose" : "external/fugue-icons/question-white.png",
		"date" : "external/famfamfam-icons/date.png",
		"style" : "external/famfamfam-icons/cog.png",
		"citation" : "external/famfamfam-icons/page_white_edit.png",
		"bibliography" : "external/famfamfam-icons/text_list_numbers.png",
		"sort" : "external/fugue-icons/sort-alphabet.png",
		"number" : "external/fugue-icons/edit-number.png",
		"layout" : "external/famfamfam-icons/page_white_stack.png",
		"group" : "external/famfamfam-icons/page_white_stack.png"
	};

	// Returns the given string with the first letter capitalised
	CSLEDIT_uiConfig.capitaliseFirstLetter = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	// Returns the display name to use to represent the given node
	// in the UI
	CSLEDIT_uiConfig.displayNameFromNode = function (node) {
		if (node.name in CSLEDIT_uiConfig.displayNames) {
			return CSLEDIT_uiConfig.displayNames[node.name](node);
		}

		// fall back to using the node name
		return CSLEDIT_uiConfig.capitaliseFirstLetter(node.name);
	};

	// generates display names for 'if' and 'else-if' tree view nodes
	//   e.g. If article OR book
	CSLEDIT_uiConfig.conditionalDisplayName = function (node) {
		var displayName = "",
			elideLimit = 30,
			match,
			terms = [],
			join = "";

		match = CSLEDIT_schema.attributes("choose/if").match.defaultValue;
		if (match === "") {
			match = "all"; // becuase it's not specified in MLZ schema, TODO: ask Frank
		}

		$.each(node.attributes, function (i, attribute) {
			if (attribute.enabled) {
				if (attribute.key === "match") {
					match = attribute.value;
				} else {
					$.each(attribute.value.split(" "), function (i, val) {
						terms.push(val);
					});
				}
			}
		});

		if (node.name === "if") {
			displayName = "If ";
		} else {
			displayName = "Else-If ";
		}

		if (match === "any") {
			displayName += terms.join(" OR ");
		} else if (match === "all") {
			displayName += terms.join(" AND ");
		} else if (match === "none") {
			displayName += "NOT (" + terms.join(" OR ") + ")";
		} else {
		debug.assert(false);
		}

		if (displayName.length > elideLimit) {
			displayName = displayName.substr(0, elideLimit - 3) + "...";
		}

		return displayName;
	};

	// A map of node names to the function used to generate its display name
	CSLEDIT_uiConfig.displayNames = {
		"macro" : function (node) {
			return "Macro: " + new CSLEDIT_CslNode(node).getAttr("name");
		},
		"text" : function (node) {
			var cslNode = new CSLEDIT_CslNode(node),
				macro = cslNode.getAttr("macro"),
				term = cslNode.getAttr("term"),
				value = cslNode.getAttr("value"),
				variable = cslNode.getAttr("variable");

			if (macro !== "") {
				return macro + " (macro)";
			} else if (term !== "") {
				return term + " (term)";
			} else if (value !== "") {
				return value + " (value)";
			} else if (variable !== "") {
				return variable + " (variable)";
			}
			return "Text";
		},
		"label" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable"),
				displayName = "Label";

			if (variable !== "") {
				displayName = variable + " (label)";
			}
			return displayName;
		},
		"number" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable");

			if (variable !== "") {
				return variable;
			}
			return "Number";
		},
		"if" : CSLEDIT_uiConfig.conditionalDisplayName,
		"else-if" : CSLEDIT_uiConfig.conditionalDisplayName,
		"citation" : function () {
			return "Inline Citations";
		},
		"bibliography" : function () {
			return "Bibliography";
		},
		"choose" : function () {
			return "Conditional";
		},
		"style" : function () {
			return "Global Formatting Options";
		},
		"key" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable"),
				macro = new CSLEDIT_CslNode(node).getAttr("macro");

			if (macro !== "") {
				return "Sort by " + macro;
			} else if (variable !== "") {
				return "Sort by " + variable;
			}

			return "Sort key";
		}
	};
	return CSLEDIT_uiConfig;
});



// Iterates through a tree in depth first order
//
// Each node of the tree must contain a children array containing it's child nodes
// 
// Can retrieve the parent node of each child in the tree

define('src/Iterator',['src/debug'], function (debug) {
	// Creates an iterator
	var CSLEDIT_Iterator = function (rootNode) {
		debug.assert(this instanceof CSLEDIT_Iterator);

		this.rootNode = rootNode;
		this.nodeStack = [];
		this.finished = false;
		this.nextNode = null;
	};

	// Returns the next node in the depth first traversal
	CSLEDIT_Iterator.prototype.next = function () {
		var topNode,
			nextNode,
			currentNode;

		nextNode = this.nextNode;
		this.nextNode = null;

		// used to implement hasNext
		if (nextNode !== null) {
			return nextNode;
		}

		if (this.finished) {
			return null;
		}

		if (this.nodeStack.length === 0) {
			// start
			this.nodeStack.push({ node : this.rootNode, childIndex : -1 });
			return this.nodeStack[0].node;
		}

		topNode = this.nodeStack[this.nodeStack.length - 1];
		topNode.childIndex++;

		if (topNode.childIndex < topNode.node.children.length) {
			nextNode = topNode.node.children[topNode.childIndex];
			this.nodeStack.push({ node : nextNode, childIndex : -1 });
			return nextNode;
		} else {
			this.nodeStack.pop();
			if (this.nodeStack.length === 0) {
				this.finished = true;
			}
			return this.next();
		}
	};

	// Returns true if there's another node left, otherwise returns false
	CSLEDIT_Iterator.prototype.hasNext = function () {
		if (this.nextNode !== null) {
			return true;
		} else {
			if (this.finished) {
				return false;
			} else {
				this.nextNode = this.next();
				return this.nextNode !== null;
			}
		}
	};

	// Returns the parent of the current node
	//
	// Note: after calling next(), you need to call this function before
	//       hasNext(), otherwise this result will be the parent of the
	//       next next() node.
	CSLEDIT_Iterator.prototype.parent = function () {
		if (this.nodeStack.length > 1) {
			return this.nodeStack[this.nodeStack.length - 2].node;
		} else {
			return null;
		}
	};

	// Returns the node stack at the current node
	//
	// Note: after calling next(), you need to call this function before
	//       hasNext(), otherwise this result will be the stack of the
	//       next next() node.
	CSLEDIT_Iterator.prototype.stack = function () {
		var stack = [];

		$.each(this.nodeStack, function(i, node) {
			stack.push(node.node);
		});
		
		return stack;
	};

	return CSLEDIT_Iterator;
});



// Miscellaneous functions for manipulating XML (e.g. stripping tags)

define('src/xmlUtility',[],function () {
	// Returns the given xml, but with all elements *not* within the
	// supportedTags list removed
	//
	// This removes both the tags and the contents within
	var stripUnsupportedTagsAndContents = function (html, supportedTags) {
		var element;

		element = $("<div/>").html(html);
		element.find("*").not(supportedTags.join(", ")).remove();

		return element.html();
	};

	// Returns the given xml, but with all tags *not* within the
	// supportedTags list removed, the contents of the tags are kept
	var stripUnsupportedTags = function (xml, supportedTags) {
		var regExpText = "</?(?:" + supportedTags.join("|") + ")[^<>]*>|(</?[^<>]*>)",
			stripUnsupportedTags,
			match,
			matches = [];

		// will only contain a captured group for unsupported tags
		stripUnsupportedTags = new RegExp(regExpText, "g");

		match = stripUnsupportedTags.exec(xml);
		while (match !== null) {
			if (match.length > 1 && typeof match[1] !== "undefined") {
				matches.push(match[1]);
			}
			match = stripUnsupportedTags.exec(xml);
		}

		$.each(matches, function (index, value) {
			xml = xml.replace(value, "");
		});

		return xml;
	};

	// Remove all attributes from all the matching tags within the given xml
	// and return the result
	var stripAttributesFromTags = function (xml, tags) {
		var regExp = new RegExp("<(" + tags.join("|") + ")[^<>]*>", "g");

		// remove any attributes the tags may have
		xml = xml.replace(regExp, "<$1>");
		return xml;
	};

	// Strip all single line comments from the given xml and return the result
	var stripComments = function (xml) {
		return xml.replace(/<!--[\s\S]*?-->/g, "");
	};

	// Remove certain tags from the given input and return the result
	var cleanInput = function (input, allowCharacters) {
		var supportedTags = [ 'b', 'i', 'u', 'sup', 'sub' ];

		// we want the contents of these but not the actual tags
		var invisibleTags = [ 'p', 'span', 'div', 'second-field-align', 'table', 'tr', 'td', 'tbody' ]; 

		input = stripComments(input);
		input = stripUnsupportedTagsAndContents(input, supportedTags.concat(invisibleTags));
		input = stripUnsupportedTags(input, supportedTags);
		input = stripAttributesFromTags(input, supportedTags);
		
		if (typeof(allowCharacters) === "undefined" || !allowCharacters) {
			input = input.replace(/&nbsp;/g, " ");
			input = input.replace("\n", "");
			input = input.replace(/&amp;/g, "&#38;");
			input = input.replace(/&lt;/g, "&#60;");
			input = input.replace(/&gt;/g, "&#62;");
			input = input.replace(/&quot;/g, "&#34;");
			input = $.trim(input);
		}

		if (input[input.length - 1] === " ") {
			input = $.trim(input) + "&nbsp;";
		}

		return input;
	};

	// Escape characters within text for html and return the result
	var htmlEscape = function (text) {
		var escaped = text;

		escaped = escaped.replace(/&/g, "&amp;");
		escaped = escaped.replace(/</g, "&lt;");
		escaped = escaped.replace(/>/g, "&gt;");
		escaped = escaped.replace(/"/g, "&quot;");

		return escaped;
	};

	return {
		stripUnsupportedTagsAndContents : stripUnsupportedTagsAndContents,
		stripUnsupportedTags : stripUnsupportedTags,
		stripAttributesFromTags : stripAttributesFromTags,
		stripComments : stripComments,
		cleanInput : cleanInput,
		htmlEscape : htmlEscape
	};	
});




// This converts between the following two formats:
//
// 1. A *.csl text file.
// 2. A JSON object as used by get() and set() in src/Data

define('src/cslParser',['src/xmlUtility', 'src/debug'], function (CSLEDIT_xmlUtility, debug) {

	// Recursively generates and returns a CSL style JSON node, converted from the given xmlNode
	//
	// nodeIndex.index is the depth-first traversal position of CSL node
	// it must start at 0, and it will be returned with nodeIndex.index = number of nodes - 1
	var jsonNodeFromXml = function (xmlNode, nodeIndex) {
		var children = [],
			index,
			jsonData,
			childNode,
			textValue,
			ELEMENT_NODE,
			TEXT_NODE,
			thisNodeIndex = nodeIndex.index;

		ELEMENT_NODE = 1;
		TEXT_NODE = 3;
		
		for (index = 0; index < xmlNode.childNodes.length; index++) {
			childNode = xmlNode.childNodes[index];

			//to be compatible with all Chrome versions and Firefox versions,
			//we have to combine both conditions: undefined, null
			if (childNode.nodeType === ELEMENT_NODE) {
				nodeIndex.index++;
				children.push(jsonNodeFromXml(xmlNode.childNodes[index], nodeIndex));
			} else {
				if (childNode.nodeType === TEXT_NODE && typeof childNode.data !== "undefined" &&
						childNode.data.trim() !== "") {
					textValue = childNode.data;
				}
			}
		}

		debug.assert(typeof textValue === "undefined" || children.length === 0, "textValue = " + textValue + " children.length = " + children.length);

		var attributesList = [];
		var thisNodeData;
		
		if (xmlNode.attributes !== null && xmlNode.attributes.length > 0) {
			for (index = 0; index < xmlNode.attributes.length; index++) {
				attributesList.push(
					{
						key : xmlNode.attributes.item(index).nodeName,
						value : xmlNode.attributes.item(index).nodeValue,
						enabled : true
					});
			}
		}

		thisNodeData = {
				name : xmlNode.nodeName,
				attributes : attributesList,
				cslId : thisNodeIndex,
				children : children
			};

		if (typeof textValue !== "undefined") {
			thisNodeData.textValue = textValue;
		}

		return thisNodeData;
	};

	var generateIndent = function (indentAmount) {
		var index,
			result = "";
		for (index = 0; index < indentAmount; index++) {
			result += "  ";
		}
		return result;
	};

	// Recursively generates and returns an XML string from the given jsonData
	var xmlNodeFromJson = function (jsonData, indent, fullClosingTags) {
		var attributesString = "",
			xmlString,
			index,
			innerString;

		if (jsonData.attributes.length > 0) {
			for (index = 0; index < jsonData.attributes.length; index++) {
				if (jsonData.attributes[index].enabled) {
					// TODO: the key probably shouldn't have characters needing escaping anyway,
					//       should not allow to input them in the first place
					attributesString += " " + 
						CSLEDIT_xmlUtility.htmlEscape(jsonData.attributes[index].key) + '="' + 
						CSLEDIT_xmlUtility.htmlEscape(jsonData.attributes[index].value) + '"';
				}
			}
		}
		xmlString = generateIndent(indent);

		if (typeof jsonData.textValue !== "undefined") {
			xmlString += "<" + jsonData.name + attributesString + ">";
			xmlString += CSLEDIT_xmlUtility.htmlEscape(jsonData.textValue) + "</" +
				CSLEDIT_xmlUtility.htmlEscape(jsonData.name) + ">\n";
		} else {
			xmlString += "<" + jsonData.name + attributesString;
			innerString = "";
			if (typeof jsonData.children !== "undefined" && jsonData.children.length > 0) {
				for (index = 0; index < jsonData.children.length; index++) {
					innerString += xmlNodeFromJson(jsonData.children[index], indent + 1, fullClosingTags);
				}
			}
			if (innerString !== "") {
				xmlString += ">\n" + innerString + generateIndent(indent) + "</" + CSLEDIT_xmlUtility.htmlEscape(jsonData.name) + ">\n";
			} else if (fullClosingTags) {
				xmlString += "></" + jsonData.name + ">\n";
			} else {
				xmlString += "/>\n";
			}
		}

		return xmlString;
	};
	
	// Returns a JSON representation of the CSL 'style' node in the given xmlData string
	var cslDataFromCslCode = function (xmlData) {
		var parser = new DOMParser(),
			xmlDoc = parser.parseFromString(xmlData, "application/xml"),
			errors;

		errors = xmlDoc.getElementsByTagName('parsererror');
		debug.assertEqual(errors.length, 0, "xml parser error");

		var styleNode = xmlDoc.childNodes[0];
		debug.assertEqual(styleNode.nodeName, "style", "Invalid style - no style node");

		var jsonData = jsonNodeFromXml(styleNode, { index: 0 });
	
		return jsonData;
	};

	// Returns a CSL style code string
	//
	// - jsonData        - the CSL 'style' node JSON representation
	// - comment         - an optional comment string to insert after the 'style' element
	// - fullClosingTags - use separate closing tags (e.g. <link></link> instead of <link/>)
	var cslCodeFromCslData = function (jsonData, comment /* optional */, fullClosingTags /* optional */) {
		var cslXml = '<?xml version="1.0" encoding="utf-8"?>\n',
			lines,
			lineIndex;
		
		cslXml += xmlNodeFromJson(jsonData, 0, fullClosingTags);

		if (typeof(comment) === "string") {
			lines = cslXml.split("\n");

			// XML comment needs to go on line no. 3, after the XML declaration and style start tag
			lines.splice(2, 0, "  <!-- " + comment + " -->");

			cslXml = lines.join("\n");
		}
		
		return cslXml;
	};

	// public:
	return {
		cslDataFromCslCode : cslDataFromCslCode,
		cslCodeFromCslData : cslCodeFromCslData
	};
});



// Provides information about the CSL styles repository

define('src/cslStyles',['src/urlUtils', 'src/debug'], function (CSLEDIT_urlUtils, debug) {
	var cache = {},

	// This is the style to load in the Visual Editor on first run,
	// or if the settings are reset
	defaultStyleId = 'http://www.zotero.org/styles/apa';

	// A list of popular styles obtained from some Mendeley data provided
	// by Carles Pina
	var topStyles = [
		'http://www.zotero.org/styles/apa',
		'http://www.zotero.org/styles/ieee',
		'http://www.zotero.org/styles/harvard1',
		'http://www.zotero.org/styles/nature',
		'http://www.zotero.org/styles/american-medical-association', /* manually updated from styles/ama */
		'http://www.zotero.org/styles/chicago-author-date',
		'http://www.zotero.org/styles/american-political-science-association',
		'http://www.zotero.org/styles/vancouver',
		'http://www.zotero.org/styles/american-sociological-association',
		'http://www.zotero.org/styles/modern-language-association',
		'http://www.zotero.org/styles/modern-humanities-research-association',
		'http://www.zotero.org/styles/chicago-fullnote-bibliography',
		'http://www.zotero.org/styles/associacao-brasileira-de-normas-tecnicas', /* manually updated from styles/abnt */
		'http://www.zotero.org/styles/chicago-note-bibliography',
		'http://www.zotero.org/styles/national-library-of-medicine', /* manually updated from styles/nlm */
		'http://www.zotero.org/styles/american-chemical-society',
		'http://www.zotero.org/styles/cell',
		'http://www.zotero.org/styles/science',
		'http://www.zotero.org/styles/elsevier-with-titles',
		'http://www.zotero.org/styles/ecology',
		'http://www.zotero.org/styles/elsevier-harvard',
		'http://www.zotero.org/styles/royal-society-of-chemistry',
		'http://www.zotero.org/styles/journal-of-the-american-chemical-society',
		'http://www.zotero.org/styles/pnas'
	];

	var getJSONData = function (path) {
		var url;

		if (!(path in cache)) {
			url = CSLEDIT_urlUtils.getResourceUrl(path);
			$.ajax({
				url : url,
				dataType : "json",
				async : false,
				success : function (data) {
					debug.log("fetched json: " + path);
					cache[path] = data;
				},
				error : function () {
							debug.log("WARNING: error fetching " + url);
						},
				cache : true
			});
		}
		return cache[path];
	};

	// Returns a normalised style for use in the generated style ID and filename
	//
	// Tries to match the current practice used in the CSL style repository as
	// best it can, despite the repo styles not being completely consistent
	//
	// See the 'style id generation' test in test_cslStyles.js
	//
	// TODO: jshint reports unsafe characters in the following, use better method of
	//       converting unicode characters to ASCII, may help to normalise the unicode
	//       in the pre-generated JSON data first, but needs investigation
	var getNormalisedStyleTitle = function (styleTitle) {
		return styleTitle
			.replace(/&/g, "and")
			.replace(/\([A-Z]*\)/g, "") // remove upper case text (acronyms) in parentheses
			.replace(/\([^\(]*\)$/, "") //remove content between last set of parentheses
			.replace(/\[[^\[]*\]$/, "") //remove content between last set of square parentheses
			.replace(/[\(\)\[\]]/g, "") // remove other parentheses
			.replace(/[,'\.]/g, "")     // remove other chars
			.replace(/[\\\/:"*?<>\| ]+/g, "-")
			.replace(/--+/g, "-")
			.replace(/-$/, "")
			.toLowerCase()
			.replace(/[àáäâ]|Ã£|Ã¡|Ã /g, "a")
			.replace(/[èéëê]|Ã©|Ã¨/g, "e")
			.replace(/[ìíïî]/g, "i")
			.replace(/[òóöô]/g, "o")
			.replace(/[ùúüû]/g, "u")
			.replace(/[ñ]/g, "n")
			.replace(/[ç]|Ã§/g, "c");
	};

	// Returns a style ID based on the given styleTitle that attempts
	// to fit with the convention used in the CSL styles repository
	var generateStyleId = function (styleTitle) {
		return "http://www.zotero.org/styles/" + getNormalisedStyleTitle(styleTitle);
	};

	// Returns the URL of the style with the given styleId on this server
	var localURLFromZoteroId = function (styleId) {
		var baseUrl = "external/csl-styles/";
		if (styles().masterIdFromId[styleId] !== styleId) {
			baseUrl += "dependent/";
		}

		return CSLEDIT_urlUtils.getResourceUrl(
			styleId.replace("http://www.zotero.org/styles/", baseUrl) + ".csl");
	};

	// This fetches the CSL code for the given styleId
	var fetchCslCode = function (styleId, success, error, async /* optional */) {
		var localURL = localURLFromZoteroId(styleId);

		if (typeof(async) === "undefined") {
			async = true;
		}

		$.ajax({
			url : localURL,
			dataType : "text",
			success : success,
			error : error,
			async : async
		});
	};

	// Returns an object containing information on all styles in the repository:
	//
	// - styleTitleFromId - A map of style ID to style title
	// - masterIdFromId   - A map of style ID to it's master style ID
	//                      (Note: Master styles will point to themselves)
	var styles = function () {
		return getJSONData('generated/cslStyles.json');
	};

	// Returns an object with the following property:
	//
	// - exampleCitationsFromMasterId - A map of master style ID to a list of
	//                                  pre-generated example citations and bibliographies
	var exampleCitations = function () {
		return getJSONData('generated/preGeneratedExampleCitations.json');
	};

	// Returns the URL of the default style on this server
	var defaultStyleURL = function () {
		return localURLFromZoteroId(defaultStyleId);
	};

	return {
		styles : styles,
		exampleCitations : exampleCitations,
		defaultStyleId : defaultStyleId,
		defaultStyleURL : defaultStyleURL,
		generateStyleId : generateStyleId,
		fetchCslCode : fetchCslCode,
		localURLFromZoteroId : localURLFromZoteroId,
		topStyles : topStyles
	};
});



// Uses CSLEDIT_storage to store the current csl style
//
// Supports the following actions:
// 
// - New style
// - Load from CSL XML
// - Add node
// - Delete node
// - Amend node
// - Move node

define('src/Data',[	'src/uiConfig', // TODO: remove this dependency
			'src/CslNode',
			'src/Iterator',
			'src/cslParser',
			'src/storage',
			'src/options',
			'src/urlUtils',
			'src/cslStyles',
			'src/debug'
		],
		function (
			CSLEDIT_uiConfig,
			CSLEDIT_CslNode,
			CSLEDIT_Iterator,
			CSLEDIT_cslParser,
			CSLEDIT_storage,
			CSLEDIT_options,
			CSLEDIT_urlUtils,
			CSLEDIT_cslStyles,
			debug
		) {
	return function (CSL_DATA, _requiredNodes /*optional*/, updateTime /*optional*/) {
		var viewControllers = [],
			callbacksEnabled = true,
			requiredNodes = _requiredNodes || [],
			
			// TODO: decide better place to put styleInfoOrder.
			//       Maybe add this general functionality to the schema for
			//       other nodes too and place the hard-coded list(s) in schemaOptions.
			//
			//       Currently only used when converting to/from CSL code, not as a
			//       constraint while using the editor, due to difficulty of
			//       implementation.
			styleInfoOrder = [
				"title",
				"title-short",
				"id",
				'link rel="self"',
				'link rel="independent-parent"',
				'link rel="template"',
				'link rel="documentation"',
				"author",
				"contributor",
				"category citation-format",
				"category field",
				"issn",
				"eissn",
				"issnl",
				"summary",
				"published",
				"updated",
				"rights"
			];

		// This returns a JSON object representing the whole CSL tree
		// exactly as it's stored in local storage
		//
		// Each node of the tree contains the same member variables as CSLEDIT_CslNode
		var get = function () {
			return CSLEDIT_storage.getItemJson(CSL_DATA);
		};

		// This sets the JSON object representing the whole CSL tree
		// as it's stored in local storage
		//
		// Each node of the tree contains the same member variables as CSLEDIT_CslNode
		var set = function (cslData) {
			var updatedNode,
				iter,
				index,
				node;

			if (updateTime) {
				// update 'style/info/updated'
				updatedNode = getNodesFromPath('style/info/updated', cslData)[0];
				if (typeof(updatedNode) === "undefined") {
					debug.log("WARNING: no style/info/updated node");
				} else {
					// write timestamp to updated node
					iter = new CSLEDIT_Iterator(cslData);
					index = 0;
					while (iter.hasNext()) {
						node = iter.next();
						if (index === updatedNode.cslId) {	
							node.textValue = (new Date()).toISOString().replace(/\.[0-9]{3}Z$/, "+00:00");
							break;
						}
						index++;
					}
				}
			}

			CSLEDIT_storage.setItem(CSL_DATA, JSON.stringify(cslData));
			return cslData;
		};

		var nodeMatch = function (nodeData, nodeString) {
			var nodeInfo = nodeString.split(" "),
				nodeName = nodeInfo[0],
				attribute,
				attributeName,
				attributeValue,
				cslNode = new CSLEDIT_CslNode(nodeData);

			if (nodeInfo.length > 1) {
				attribute = nodeInfo[1].split("=");
				attributeName = attribute[0];
				if (attribute.length > 1) {
					attributeValue = attribute[1].replace(/"/g, "");
				}
			}

			if (nodeName !== nodeData.name) {
				return false;
			}
			
			if (typeof(attributeName) !== "undefined" && !cslNode.hasAttr(attributeName)) {
				return false;
			}

			if (typeof(attributeValue) !== "undefined" &&
					cslNode.getAttr(attributeName) !== attributeValue) {
				return false;
			}

			return true;
		};

		var reorderStyleInfoNode = function (cslData /*optional*/) {
			var styleInfoNode;

			cslData = cslData || get();

			// re-order the style/info child nodes:
			$.each(getNodesFromPath('style/info', cslData), function (i, infoNode) {
				var iterator,
					cslId = infoNode.cslId;

				styleInfoNode = infoNode;

				// re-order
				infoNode.children.sort(function (a, b) {
					var orderA = styleInfoOrder.length,
						orderB = styleInfoOrder.length;

					$.each(styleInfoOrder, function (i, nodeString) {
						if (nodeMatch(a, nodeString)) {
							orderA = i;
						}
						if (nodeMatch(b, nodeString)) {
							orderB = i;
						}
					});

					return orderA - orderB;
				});

				// set cslIds
				iterator = new CSLEDIT_Iterator(infoNode);
				while (iterator.hasNext()) {
					iterator.next().cslId = cslId;
					cslId++;
				}

				return false;
			});

			return styleInfoNode;
		};

		// Sets the current CSL style from the given string containing XML
		var setCslCode = function (cslCode, allowDependentStyle /* optional */) {
			var cslData,
				error;
			
			try {
				cslData = CSLEDIT_cslParser.cslDataFromCslCode(cslCode);
			} catch (err) {
				return { error: {
					type: "cslParsing",
					message: "Error parsing CSL Code"
				}};
			}

			if (!allowDependentStyle) {
				// check if this is a dependent style:
				$.each(getNodesFromPath('style/info/link', cslData), function (i, node) {
					var linkNode = new CSLEDIT_CslNode(node);
					if (linkNode.getAttr("rel") === "independent-parent") {
						error = {
							type: "dependentStyle",
							parentURL: linkNode.getAttr("href"),
							message: "Editing of dependent styles not yet supported.\n\n" + 
								"Please find and edit this master style instead:\n\n" +
								linkNode.getAttr("href")
						};
					}
				});
			}

			// check it contains required nodes
			if (typeof error === "undefined") {
				$.each(requiredNodes, function (i, requiredNode) {
					if (getNodesFromPath(requiredNode, cslData).length === 0) {
						error = {
							type: "nodeMissing",
							node: requiredNode,
							message: "CSL code is missing essential node: " + requiredNode
						};
						return false;
					}
				});
			}

			reorderStyleInfoNode(cslData);

			if (error) {
				return { error: error };
			}

			if (updateTime) {
				// add a style/info/updated node if not present
				// (this will be written to on every edit, create here
				//  to avoid doing on every change which would complicate
				//  undo/redo code in CSLEDIT_controller)
				updateTime = false;
				set(cslData);
				if (getNodesFromPath('style/info/updated').length === 0) {
					debug.log("creating required updated node");
					_addNode(getNodesFromPath('style/info')[0].cslId, "last",
							new CSLEDIT_CslNode("updated", [], [], -1), true);
				}
				cslData = get();
				updateTime = true;
			}

			set(cslData);

			emit("newStyle", []);
			return {};
		};

		// Returns a string with the CSL style in XML format ready for output
		var getCslCode = function (comment /* optional */) {
			var cslData = get();
			reorderStyleInfoNode(cslData);
		
			return CSLEDIT_cslParser.cslCodeFromCslData(cslData, comment);
		};

		var spliceNode = function (cslId, position, nodesToDelete, newNode) {
			var iter,
				cslData,
				index,
				node,
				nodesBefore;

			cslData = get();

			nodesBefore = numNodes(cslData);

			// Find the id of the node to add
			iter = new CSLEDIT_Iterator(cslData);

			index = 0;
			while (iter.hasNext()) {
				node = iter.next();
				
				if (index === cslId) {
					debug.assertEqual(node.cslId, index);
					debug.assert(position + nodesToDelete <= node.children.length);

					if (typeof newNode === "undefined") {
						node.children.splice(position, nodesToDelete);
					} else {
						node.children.splice(position, nodesToDelete, newNode);
					}
				}
				index++;
			}

			// correct the cslId numbering
			iter = new CSLEDIT_Iterator(cslData);
			index = 0;
			while (iter.hasNext()) {
				node = iter.next();
				node.cslId = index;
				index++;
			}

			set(cslData);

			return index - nodesBefore; // difference in number of nodes
		};

		// Returns an object containing:
		//
		// node - the CSL node with the given cslId,
		// parent - it's parent
		var getNodeAndParent = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				node;

			while (iter.hasNext()) {
				node = iter.next();

				if (node.cslId === cslId) {
					return {
						node : node,
						parent : iter.parent()
					};
				}
			}

			// not found
			return { node : null, parent : null };
		};

		// Returns a list containing the node at cslId, and all it's parents
		//
		// The first element will be the root 'style' node
		// The last element will be the node with the given cslId
		var getNodeStack = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				nodeStack,
				node;

			while (iter.hasNext()) {
				node = iter.next();

				if (node.cslId === cslId) {
					return iter.stack();
				}
			}
		};

		// Returns a list of node names correspoding to the current node stack
		// (see getNodeStack())
		var getNodePath = function (cslId) {
			var nodeNames = [];
			$.each(getNodeStack(cslId), function (i, node) {
				nodeNames.push(node.name);
			});
			return nodeNames.join('/');
		};

		// Returns CSL node JSON of the node with the given cslId
		var getNode = function (cslId, cslData /* optional */) {
			if (typeof cslData !== "undefined") {
				return getNodeAndParent(cslId, cslData).node;
			} else {
				return getNodeAndParent(cslId).node;
			}
		};

		// Returns all matching nodes with the given path or
		// null if it couldn't find a match
		//
		// path is a '/' delimited string of the node stack you are searching for.
		//
		// e.g. 'style/citation/layout'
		var getNodesFromPath = function (path, cslData /* optional */) {
			var splitPath = path.split("/"),
				rootNode,
				result = [];

			if (typeof cslData === "undefined") {
				cslData = get();
			}

			rootNode = splitPath.splice(0, 1);

			if (rootNode[0] === "") {
				return result;
			}

			getNodesFromPath_inner(splitPath, cslData, result);
			return result;
		};

		var getNodesFromPath_inner = function (path, nodeData, result) {
			var index,
				rootNode,
				regExp,
				newPath;

			if (path.length === 0) {
				result.push(nodeData);
				return;
			}

			rootNode = path[0];
			newPath = path.slice(1, path.length);

			// convert '*' wildcard to regexp equivalent
			regExp = new RegExp("^" + rootNode.replace("*", ".*") + "$");

			for (index = 0; index < nodeData.children.length; index++) {
				if (regExp.test(nodeData.children[index].name)) {
					getNodesFromPath_inner(newPath, nodeData.children[index], result);
				}
			}
		};

		// Returns the cslId of the first node within the given cslData tree
		// with the name nodeName
		var getFirstCslId = function (cslData, nodeName) {
			var index,
				result;

			if (cslData.name === nodeName) {
				return cslData.cslId;
			} else {
				for (index = 0; index < cslData.children.length; index++) {
					result = getFirstCslId(cslData.children[index], nodeName);
					if (result > -1) {
						return result;
					}
				}
			}
			// couldn't find it
			return -1;
		};
		
		// Returns the number of nodes in the given CSL node tree
		var numNodes = function (cslNode) {
			// use the whole tree if none specified
			cslNode = cslNode || get();

			var iter = new CSLEDIT_Iterator(cslNode),
				index = 0;

			while (iter.hasNext()) {
				iter.next();
				index++;
			}

			return index;
		};

		var emit = function (event, args) {
			$.each(viewControllers, function (index, controller) {
				controller.styleChanged(event, args);
			});
		};
		
		// Get the index of the given childNode within the given parentNode
		// or -1 if childNode is not a child of parentNode
		var indexOfChild = function (childNode, parentNode) {
			var index;
			for (index = 0; index < parentNode.children.length; index++) {
				if (childNode.cslId === parentNode.children[index].cslId) {
					return index;
				}
			}
			return -1;
		};
		
		// If the node 'cslId' is a macro instance, return the cslId of the 
		// corresponding macro definition
		//
		// Else, return 'cslId'
		var macroDefinitionIdFromInstanceId = function (cslId) {
			var node = new CSLEDIT_CslNode(getNode(cslId)),
				macroName,
				macroNodes,
				macroNode;

			macroName = node.getAttr("macro");
			if (node.name === "text" && macroName !== "") {
				macroNodes = getNodesFromPath("style/macro");

				$.each(macroNodes, function (i, macroNode) {
					var thisMacroNode = new CSLEDIT_CslNode(macroNode);
					if (thisMacroNode.getAttr("name") === macroName) {
						cslId = thisMacroNode.cslId;
						return false;
					}
				});
			}
			return cslId;
		};
		
		// Adds a CSL node
		//
		// cslId - The existing CSL node cslId to create within or next to
		// position - Where to place the new node relative to the exitsing one.
		//            Can be one of the following positions:
		// 
		//   - integer  - the child index within the existing node
		//   - "first"  - the first child of the existing node
		//   - "last"   - the last child of the existing node
		//   - "inside" - same as "last"
		//   - "before" - the sibling before the existing node
		//   - "after"  - the sibling after the existing node
		//
		// newNode - the new CSL node to add (follows the CSL node JSON described in src/CslNode.js)
		var addNode = function (cslId, position, newNode) {
			var newCslId = _addNode(cslId, position, newNode),
				inverse;
			emit("updateFinished");

			// return the inverse command for undo functionality
			return {
				command : "deleteNode",
				args : [ newCslId ]
			};
		};

		var _addNode = function (cslId, position, newNode, suppressViewUpdate /*optional*/) {
			var nodeInfo,
				positionIndex,
				nodesAdded,
				defaultAttributes,
				defaultChildren;
			
			newNode.cslId = -1;
			newNode.children = newNode.children || [];
			newNode.attributes = newNode.attributes || [];

			defaultAttributes = CSLEDIT_uiConfig.defaultAttributes[newNode.name];

			// populate with default attributes
			if (newNode.attributes.length === 0 && typeof defaultAttributes !== "undefined") {
				$.each(defaultAttributes, function (attribute, value) {
					newNode.attributes.push({key: attribute, value: value, enabled: true});
				});
			}

			defaultChildren = CSLEDIT_uiConfig.defaultChildren[newNode.name];

			// populate with default children
			if (newNode.children.length === 0 && typeof defaultChildren !== "undefined") {
				newNode.children = defaultChildren;
			}

			if (typeof position === "number") {
				// change parent cslId from macro instances to macro definitions
				cslId = macroDefinitionIdFromInstanceId(cslId);

				nodesAdded = spliceNode(cslId, position, 0, newNode);
				if (!suppressViewUpdate) {
					emit("addNode", [cslId, position, newNode, nodesAdded]);
				}
			} else {
				switch (position) {
				case "first":
					// change parent cslId from macro instances to macro definitions
					cslId = macroDefinitionIdFromInstanceId(cslId);

					return _addNode(cslId, 0, newNode, suppressViewUpdate);
				case "inside":
				case "last":
					// change parent cslId from macro instances to macro definitions
					cslId = macroDefinitionIdFromInstanceId(cslId);
					
					return _addNode(cslId, getNode(cslId).children.length, newNode, suppressViewUpdate);
				case "before":
				case "after":
					debug.assert(cslId !== 0);
					nodeInfo = getNodeAndParent(cslId);
					positionIndex = indexOfChild(nodeInfo.node, nodeInfo.parent);
					if (position === "after") {
						positionIndex++;
					}
					return _addNode(nodeInfo.parent.cslId, positionIndex, newNode, suppressViewUpdate);
				case "default":
					debug.assert(false, "position: " + position + " not recognised");
				}
			}
			return newNode.cslId;
		};
		
		// Deletes the CSL node with the given cslId
		var deleteNode = function (cslId) {
			var deletedNode,
				nodeAndParent = getNodeAndParent(cslId),
				parentNode,
				position,
				nodePath = getNodePath(cslId),
				error;

			// can't delete required nodes
			$.each(requiredNodes, function (i, requiredNodePath) {
				if (nodePath === requiredNodePath) {
					error = {
						type: "requiredNode",
						message: "Cannot delete required node: " + nodePath
					};
					return false;
				}
			});

			// can't delete the updated node
			// (this isn't in requiredNodes because it's OK to load a style without it)
			if (nodePath === "style/info/updated") {
				error = {
					type: "requiredNode",
					message: "Cannot delete required node: " + nodePath
				};
			}

			if (error) {
				return { error : error };
			}

			parentNode = nodeAndParent.parent.cslId;
			position = indexOfChild(nodeAndParent.node, nodeAndParent.parent);

			deletedNode = _deleteNode(cslId);

			emit("updateFinished");

			// return the inverse command for undo functionality
			return {
				command : "addNode",
				args : [ parentNode, position, deletedNode ]
			};
		};

		var _deleteNode = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				index,
				node,
				parentNode,
				nodesDeleted;

			debug.assert(cslId !== 0); // can't delete the style node

			index = 0;
			while (iter.hasNext()) {
				node = iter.next();

				if (index === cslId) {
					parentNode = iter.parent();
					break;
				}
				index++;
			}

			debug.assert(typeof parentNode !== "undefined");
			nodesDeleted = -spliceNode(parentNode.cslId, indexOfChild(node, parentNode), 1);
			debug.assertEqual(node.cslId, cslId);
			
			emit("deleteNode", [cslId, nodesDeleted]);
			
			return node;
		};

		// Replaces the CSL node at the given cslId, with the given ammendedNode
		//
		// Note: This leaves the list of children intact, so that the whole ammendedNode
		//       sub-tree doesn't need to be passed
		var amendNode = function (cslId, amendedNode) {
			var cslData = get(),
				iter,
				node,
				index,
				result,
				oldNode;
			
			iter = new CSLEDIT_Iterator(cslData);
			index = 0;

			while (iter.hasNext()) {
				node = iter.next();
				if (index === cslId) {
					debug.assertEqual(node.cslId, cslId);
					
					oldNode = new CSLEDIT_CslNode(node.name, node.attributes, [], node.cslId);
					oldNode.textValue = node.textValue;

					node.name = amendedNode.name;
					node.attributes = amendedNode.attributes;
					node.textValue = amendedNode.textValue;

					break;
				}
				index++;
			}
			debug.assert(typeof node !== "undefined");
			set(cslData);
			emit("amendNode", [cslId, node]);
			emit("updateFinished");
			// return inverse command
			return {
				command : "amendNode",
				args : [cslId, oldNode]
			};
		};

		// This deletes the node with the given fromCslId, and adds it near the toCslId
		// at the given position.
		//
		// position accepts the same values as addNode()
		var moveNode = function (fromCslId, toCslId, position) {
			var deletedNode, fromNode,
				inverseFromCslId,
				inverseToNodeAndParent = getNodeAndParent(fromCslId),
				inverseToCslId,
				inverseToPosition;

			callbacksEnabled = false;

			inverseToCslId = inverseToNodeAndParent.parent.cslId;
			inverseToPosition = indexOfChild(inverseToNodeAndParent.node, inverseToNodeAndParent.parent);

			deletedNode = _deleteNode(fromCslId);

			debug.log("deletedNode = " + deletedNode.cslId);
			if (toCslId > fromCslId) {
				toCslId -= numNodes(deletedNode);
			}

			inverseFromCslId = _addNode(toCslId, position, deletedNode);
			if (inverseToCslId > inverseFromCslId) {
				inverseToCslId += numNodes(deletedNode);
			}

			callbacksEnabled = true;

			emit("updateFinished");
			// return inverse command
			return {
				command : "moveNode",
				args : [inverseFromCslId, inverseToCslId, inverseToPosition]
			};
		};

		// Tries in the following order to initialise the CSL style, if one fails
		// try the next
		//
		// - Get the one specified in CSLEDIT_options("initialCslCode")
		// - Get the one in CSLEDIT_storage.getItem("CSLEDIT.data")
		// - Get the default style specified in CSLEDIT_cslStyles.defaultStyleURL()
		//
		// Then call the given callback function
		var initPageStyle = function (callback) {
			var cslData, styleURL, result;
			cslData = get(); 
			
			// First try loading the style specified in options
			if (typeof CSLEDIT_options.get("initialCslCode") !== "undefined") {
				result = setCslCode(CSLEDIT_options.get("initialCslCode"));
				if (result.hasOwnProperty('error')) {
					alert(result.error.message);
				} else {
					if (typeof callback !== "undefined") {
						callback();
					}
					return;
				}
			}
			
			// Next try the 
			if (cslData === null || cslData === "") {
				styleURL = CSLEDIT_cslStyles.defaultStyleURL();
				$.get(styleURL, {}, function (cslCode) {
					var result;
					cslCode = cslCode.replace(/<!--.*?-->/g, "");
					result = setCslCode(cslCode);
					if (result.hasOwnProperty('error')) {
						alert(result.error);
					}
					if (typeof callback !== "undefined") {
						callback();
					}
				}, "text");
			} else {
				if (typeof callback !== "undefined") {
					callback();
				}
			}
		};

		// remove all view controllers
		var clearViewControllers = function () {
			viewControllers = [];
		};

		// add a view controller which will get notified by calling the relevant
		// function (addNode, deleteNode, etc...) whenever the CSL style is changed
		var addViewController = function (viewController) {
			viewControllers.push(viewController);
		};

		return {
			// Write functions (if CSLEDIT_controller is being used on this page,
			//                  use the equivalent CSLEDIT_controller commands
			//                  instead of these)
			setCslCode : setCslCode,
			addNode : addNode,
			deleteNode : deleteNode,
			amendNode : amendNode,
			moveNode : moveNode,

			// Read-only functions (safe to use anywhere)
			getCslCode : getCslCode,
			get : get,
			getNode : getNode,
			getNodeAndParent : getNodeAndParent,
			getNodeStack : getNodeStack,
			getNodePath : getNodePath,
			getFirstCslId : getFirstCslId,

			initPageStyle : initPageStyle,
			numNodes : numNodes,
			clearViewControllers : clearViewControllers,
			addViewController : addViewController,
			getNodesFromPath : getNodesFromPath,
			indexOfChild : indexOfChild,
			macroDefinitionIdFromInstanceId : macroDefinitionIdFromInstanceId
		};
	};
});



// The global instance of CSLEDIT_Data, which stores the currently loaded CSL style
//
// Note: Despite its name, this is always loaded as CSLEDIT_data in the rest of the code.
//       (The reason is that data.js and Data.js are the same filename on Windows)

define('src/dataInstance',['src/Data'], function (CSLEDIT_Data) {
	// Returns the global instance of CSLEDIT_Data
	return CSLEDIT_Data("CSLEDIT.cslData", [
		"style",
		"style/info",
		"style/info/title",
		"style/info/id",
		"style/citation",
		"style/citation/layout"
	], true);
});

// All functions that need access to the editor's state live inside
// the CodeMirror function. Below that, at the bottom of the file,
// some utilities are defined.

// CodeMirror is the only global var we claim
var CodeMirror = (function() {
  
  // This is the function that produces an editor instance. Its
  // closure is used to store the editor state.
  function CodeMirror(place, givenOptions) {
    // Determine effective options based on given values and defaults.
    var options = {}, defaults = CodeMirror.defaults;
    for (var opt in defaults)
      if (defaults.hasOwnProperty(opt))
        options[opt] = (givenOptions && givenOptions.hasOwnProperty(opt) ? givenOptions : defaults)[opt];

    var input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em");
    input.setAttribute("wrap", "off"); input.setAttribute("autocorrect", "off"); input.setAttribute("autocapitalize", "off");
    // Wraps and hides input textarea
    var inputDiv = elt("div", [input], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The empty scrollbar content, used solely for managing the scrollbar thumb.
    var scrollbarInner = elt("div", null, "CodeMirror-scrollbar-inner");
    // The vertical scrollbar. Horizontal scrolling is handled by the scroller itself.
    var scrollbar = elt("div", [scrollbarInner], "CodeMirror-scrollbar");
    // DIVs containing the selection and the actual code
    var lineDiv = elt("div"), selectionDiv = elt("div", null, null, "position: relative; z-index: -1");
    // Blinky cursor, and element used to ensure cursor fits at the end of a line
    var cursor = elt("pre", "\u00a0", "CodeMirror-cursor"), widthForcer = elt("pre", "\u00a0", "CodeMirror-cursor", "visibility: hidden");
    // Used to measure text size
    var measure = elt("div", null, null, "position: absolute; width: 100%; height: 0px; overflow: hidden; visibility: hidden;");
    var lineSpace = elt("div", [measure, cursor, widthForcer, selectionDiv, lineDiv], null, "position: relative; z-index: 0");
    var gutterText = elt("div", null, "CodeMirror-gutter-text"), gutter = elt("div", [gutterText], "CodeMirror-gutter");
    // Moved around its parent to cover visible view
    var mover = elt("div", [gutter, elt("div", [lineSpace], "CodeMirror-lines")], null, "position: relative");
    // Set to the height of the text, causes scrolling
    var sizer = elt("div", [mover], null, "position: relative");
    // Provides scrolling
    var scroller = elt("div", [sizer], "CodeMirror-scroll");
    scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    var wrapper = elt("div", [inputDiv, scrollbar, scroller], "CodeMirror" + (options.lineWrapping ? " CodeMirror-wrap" : ""));
    if (place.appendChild) place.appendChild(wrapper); else place(wrapper);

    themeChanged(); keyMapChanged();
    // Needed to hide big blue blinking cursor on Mobile Safari
    if (ios) input.style.width = "0px";
    if (!webkit) scroller.draggable = true;
    lineSpace.style.outline = "none";
    if (options.tabindex != null) input.tabIndex = options.tabindex;
    if (options.autofocus) focusInput();
    if (!options.gutter && !options.lineNumbers) gutter.style.display = "none";
    // Needed to handle Tab key in KHTML
    if (khtml) inputDiv.style.height = "1px", inputDiv.style.position = "absolute";

    // Check for OS X >= 10.7. If so, we need to force a width on the scrollbar, and
    // make it overlap the content. (But we only do this if the scrollbar doesn't already
    // have a natural width. If the mouse is plugged in or the user sets the system pref
    // to always show scrollbars, the scrollbar shouldn't overlap.)
    if (mac_geLion) {
      scrollbar.className += (overlapScrollbars() ? " cm-sb-overlap" : " cm-sb-nonoverlap");
    } else if (ie_lt8) {
      // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
      scrollbar.className += " cm-sb-ie7";
    }

    // Check for problem with IE innerHTML not working when we have a
    // P (or similar) parent node.
    try { charWidth(); }
    catch (e) {
      if (e.message.match(/runtime/i))
        e = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)");
      throw e;
    }

    // Delayed object wrap timeouts, making sure only one is active. blinker holds an interval.
    var poll = new Delayed(), highlight = new Delayed(), blinker;

    // mode holds a mode API object. doc is the tree of Line objects,
    // work an array of lines that should be parsed, and history the
    // undo history (instance of History constructor).
    var mode, doc = new BranchChunk([new LeafChunk([new Line("")])]), work, focused;
    loadMode();
    // The selection. These are always maintained to point at valid
    // positions. Inverted is used to remember that the user is
    // selecting bottom-to-top.
    var sel = {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}, inverted: false};
    // Selection-related flags. shiftSelecting obviously tracks
    // whether the user is holding shift.
    var shiftSelecting, lastClick, lastDoubleClick, lastScrollTop = 0, draggingText,
        overwrite = false, suppressEdits = false;
    // Variables used by startOperation/endOperation to track what
    // happened during the operation.
    var updateInput, userSelChange, changes, textChanged, selectionChanged, leaveInputAlone,
        gutterDirty, callbacks;
    // Current visible range (may be bigger than the view window).
    var displayOffset = 0, showingFrom = 0, showingTo = 0, lastSizeC = 0;
    // bracketHighlighted is used to remember that a bracket has been
    // marked.
    var bracketHighlighted;
    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    var maxLine = getLine(0), updateMaxLine = false, maxLineChanged = true;
    var tabCache = {};
    var pollingFast = false; // Ensures slowPoll doesn't cancel fastPoll
    var goalColumn = null;

    // Initialize the content.
    operation(function(){setValue(options.value || ""); updateInput = false;})();
    var history = new History();

    // Register our event handlers.
    connect(scroller, "mousedown", operation(onMouseDown));
    connect(scroller, "dblclick", operation(onDoubleClick));
    connect(lineSpace, "selectstart", e_preventDefault);
    // Gecko browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for Gecko.
    if (!gecko) connect(scroller, "contextmenu", onContextMenu);
    connect(scroller, "scroll", onScrollMain);
    connect(scrollbar, "scroll", onScrollBar);
    connect(scrollbar, "mousedown", function() {if (focused) setTimeout(focusInput, 0);});
    connect(window, "resize", function() {updateDisplay(true);});
    connect(input, "keyup", operation(onKeyUp));
    connect(input, "input", fastPoll);
    connect(input, "keydown", operation(onKeyDown));
    connect(input, "keypress", operation(onKeyPress));
    connect(input, "focus", onFocus);
    connect(input, "blur", onBlur);

    function drag_(e) {
      if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) return;
      e_stop(e);
    }
    if (options.dragDrop) {
      connect(scroller, "dragstart", onDragStart);
      connect(scroller, "dragenter", drag_);
      connect(scroller, "dragover", drag_);
      connect(scroller, "drop", operation(onDrop));
    }
    connect(scroller, "paste", function(){focusInput(); fastPoll();});
    connect(input, "paste", fastPoll);
    connect(input, "cut", operation(function(){
      if (!options.readOnly) replaceSelection("");
    }));

    // Needed to handle Tab key in KHTML
    if (khtml) connect(sizer, "mouseup", function() {
        if (document.activeElement == input) input.blur();
        focusInput();
    });

    // IE throws unspecified error in certain cases, when
    // trying to access activeElement before onload
    var hasFocus; try { hasFocus = (document.activeElement == input); } catch(e) { }
    if (hasFocus || options.autofocus) setTimeout(onFocus, 20);
    else onBlur();

    function isLine(l) {return l >= 0 && l < doc.size;}
    // The instance object that we'll return. Mostly calls out to
    // local functions in the CodeMirror function. Some do some extra
    // range checking and/or clipping. operation is used to wrap the
    // call so that changes it makes are tracked, and the display is
    // updated afterwards.
    var instance = wrapper.CodeMirror = {
      getValue: getValue,
      setValue: operation(setValue),
      getSelection: getSelection,
      replaceSelection: operation(replaceSelection),
      focus: function(){window.focus(); focusInput(); onFocus(); fastPoll();},
      setOption: function(option, value) {
        var oldVal = options[option];
        options[option] = value;
        if (option == "mode" || option == "indentUnit") loadMode();
        else if (option == "readOnly" && value == "nocursor") {onBlur(); input.blur();}
        else if (option == "readOnly" && !value) {resetInput(true);}
        else if (option == "theme") themeChanged();
        else if (option == "lineWrapping" && oldVal != value) operation(wrappingChanged)();
        else if (option == "tabSize") updateDisplay(true);
        else if (option == "keyMap") keyMapChanged();
        if (option == "lineNumbers" || option == "gutter" || option == "firstLineNumber" ||
            option == "theme" || option == "lineNumberFormatter") {
          gutterChanged();
          updateDisplay(true);
        }
      },
      getOption: function(option) {return options[option];},
      undo: operation(undo),
      redo: operation(redo),
      indentLine: operation(function(n, dir) {
        if (typeof dir != "string") {
          if (dir == null) dir = options.smartIndent ? "smart" : "prev";
          else dir = dir ? "add" : "subtract";
        }
        if (isLine(n)) indentLine(n, dir);
      }),
      indentSelection: operation(indentSelected),
      historySize: function() {return {undo: history.done.length, redo: history.undone.length};},
      clearHistory: function() {history = new History();},
      setHistory: function(histData) {
        history = new History();
        history.done = histData.done;
        history.undone = histData.undone;
      },
      getHistory: function() {
        history.time = 0;
        return {done: history.done.concat([]), undone: history.undone.concat([])};
      },
      matchBrackets: operation(function(){matchBrackets(true);}),
      getTokenAt: operation(function(pos) {
        pos = clipPos(pos);
        return getLine(pos.line).getTokenAt(mode, getStateBefore(pos.line), options.tabSize, pos.ch);
      }),
      getStateAfter: function(line) {
        line = clipLine(line == null ? doc.size - 1: line);
        return getStateBefore(line + 1);
      },
      cursorCoords: function(start, mode) {
        if (start == null) start = sel.inverted;
        return this.charCoords(start ? sel.from : sel.to, mode);
      },
      charCoords: function(pos, mode) {
        pos = clipPos(pos);
        if (mode == "local") return localCoords(pos, false);
        if (mode == "div") return localCoords(pos, true);
        return pageCoords(pos);
      },
      coordsChar: function(coords) {
        var off = eltOffset(lineSpace);
        return coordsChar(coords.x - off.left, coords.y - off.top);
      },
      markText: operation(markText),
      setBookmark: setBookmark,
      findMarksAt: findMarksAt,
      setMarker: operation(addGutterMarker),
      clearMarker: operation(removeGutterMarker),
      setLineClass: operation(setLineClass),
      hideLine: operation(function(h) {return setLineHidden(h, true);}),
      showLine: operation(function(h) {return setLineHidden(h, false);}),
      onDeleteLine: function(line, f) {
        if (typeof line == "number") {
          if (!isLine(line)) return null;
          line = getLine(line);
        }
        (line.handlers || (line.handlers = [])).push(f);
        return line;
      },
      lineInfo: lineInfo,
      getViewport: function() { return {from: showingFrom, to: showingTo};},
      addWidget: function(pos, node, scroll, vert, horiz) {
        pos = localCoords(clipPos(pos));
        var top = pos.yBot, left = pos.x;
        node.style.position = "absolute";
        sizer.appendChild(node);
        if (vert == "over") top = pos.y;
        else if (vert == "near") {
          var vspace = Math.max(scroller.offsetHeight, doc.height * textHeight()),
              hspace = Math.max(sizer.clientWidth, lineSpace.clientWidth) - paddingLeft();
          if (pos.yBot + node.offsetHeight > vspace && pos.y > node.offsetHeight)
            top = pos.y - node.offsetHeight;
          if (left + node.offsetWidth > hspace)
            left = hspace - node.offsetWidth;
        }
        node.style.top = (top + paddingTop()) + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = sizer.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") left = 0;
          else if (horiz == "middle") left = (sizer.clientWidth - node.offsetWidth) / 2;
          node.style.left = (left + paddingLeft()) + "px";
        }
        if (scroll)
          scrollIntoView(left, top, left + node.offsetWidth, top + node.offsetHeight);
      },

      lineCount: function() {return doc.size;},
      clipPos: clipPos,
      getCursor: function(start) {
        if (start == null) start = sel.inverted;
        return copyPos(start ? sel.from : sel.to);
      },
      somethingSelected: function() {return !posEq(sel.from, sel.to);},
      setCursor: operation(function(line, ch, user) {
        if (ch == null && typeof line.line == "number") setCursor(line.line, line.ch, user);
        else setCursor(line, ch, user);
      }),
      setSelection: operation(function(from, to, user) {
        (user ? setSelectionUser : setSelection)(clipPos(from), clipPos(to || from));
      }),
      getLine: function(line) {if (isLine(line)) return getLine(line).text;},
      getLineHandle: function(line) {if (isLine(line)) return getLine(line);},
      setLine: operation(function(line, text) {
        if (isLine(line)) replaceRange(text, {line: line, ch: 0}, {line: line, ch: getLine(line).text.length});
      }),
      removeLine: operation(function(line) {
        if (isLine(line)) replaceRange("", {line: line, ch: 0}, clipPos({line: line+1, ch: 0}));
      }),
      replaceRange: operation(replaceRange),
      getRange: function(from, to, lineSep) {return getRange(clipPos(from), clipPos(to), lineSep);},

      triggerOnKeyDown: operation(onKeyDown),
      execCommand: function(cmd) {return commands[cmd](instance);},
      // Stuff used by commands, probably not much use to outside code.
      moveH: operation(moveH),
      deleteH: operation(deleteH),
      moveV: operation(moveV),
      toggleOverwrite: function() {
        if(overwrite){
          overwrite = false;
          cursor.className = cursor.className.replace(" CodeMirror-overwrite", "");
        } else {
          overwrite = true;
          cursor.className += " CodeMirror-overwrite";
        }
      },

      posFromIndex: function(off) {
        var lineNo = 0, ch;
        doc.iter(0, doc.size, function(line) {
          var sz = line.text.length + 1;
          if (sz > off) { ch = off; return true; }
          off -= sz;
          ++lineNo;
        });
        return clipPos({line: lineNo, ch: ch});
      },
      indexFromPos: function (coords) {
        if (coords.line < 0 || coords.ch < 0) return 0;
        var index = coords.ch;
        doc.iter(0, coords.line, function (line) {
          index += line.text.length + 1;
        });
        return index;
      },
      scrollTo: function(x, y) {
        if (x != null) scroller.scrollLeft = x;
        if (y != null) scrollbar.scrollTop = scroller.scrollTop = y;
        updateDisplay([]);
      },
      getScrollInfo: function() {
        return {x: scroller.scrollLeft, y: scrollbar.scrollTop,
                height: scrollbar.scrollHeight, width: scroller.scrollWidth};
      },
      setSize: function(width, height) {
        function interpret(val) {
          val = String(val);
          return /^\d+$/.test(val) ? val + "px" : val;
        }
        if (width != null) wrapper.style.width = interpret(width);
        if (height != null) scroller.style.height = interpret(height);
        instance.refresh();
      },

      operation: function(f){return operation(f)();},
      compoundChange: function(f){return compoundChange(f);},
      refresh: function(){
        updateDisplay(true, null, lastScrollTop);
        if (scrollbar.scrollHeight > lastScrollTop)
          scrollbar.scrollTop = lastScrollTop;
      },
      getInputField: function(){return input;},
      getWrapperElement: function(){return wrapper;},
      getScrollerElement: function(){return scroller;},
      getGutterElement: function(){return gutter;}
    };

    function getLine(n) { return getLineAt(doc, n); }
    function updateLineHeight(line, height) {
      gutterDirty = true;
      var diff = height - line.height;
      for (var n = line; n; n = n.parent) n.height += diff;
    }

    function setValue(code) {
      var top = {line: 0, ch: 0};
      updateLines(top, {line: doc.size - 1, ch: getLine(doc.size-1).text.length},
                  splitLines(code), top, top);
      updateInput = true;
    }
    function getValue(lineSep) {
      var text = [];
      doc.iter(0, doc.size, function(line) { text.push(line.text); });
      return text.join(lineSep || "\n");
    }

    function onScrollBar(e) {
      if (scrollbar.scrollTop != lastScrollTop) {
        lastScrollTop = scroller.scrollTop = scrollbar.scrollTop;
        updateDisplay([]);
      }
    }

    function onScrollMain(e) {
      if (options.fixedGutter && gutter.style.left != scroller.scrollLeft + "px")
        gutter.style.left = scroller.scrollLeft + "px";
      if (scroller.scrollTop != lastScrollTop) {
        lastScrollTop = scroller.scrollTop;
        if (scrollbar.scrollTop != lastScrollTop)
          scrollbar.scrollTop = lastScrollTop;
        updateDisplay([]);
      }
      if (options.onScroll) options.onScroll(instance);
    }

    function onMouseDown(e) {
      setShift(e_prop(e, "shiftKey"));
      // Check whether this is a click in a widget
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == sizer && n != mover) return;

      // See if this is a click in the gutter
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == gutterText) {
          if (options.onGutterClick)
            options.onGutterClick(instance, indexOf(gutterText.childNodes, n) + showingFrom, e);
          return e_preventDefault(e);
        }

      var start = posFromMouse(e);

      switch (e_button(e)) {
      case 3:
        if (gecko) onContextMenu(e);
        return;
      case 2:
        if (start) setCursor(start.line, start.ch, true);
        setTimeout(focusInput, 20);
        e_preventDefault(e);
        return;
      }
      // For button 1, if it was clicked inside the editor
      // (posFromMouse returning non-null), we have to adjust the
      // selection.
      if (!start) {if (e_target(e) == scroller) e_preventDefault(e); return;}

      if (!focused) onFocus();

      var now = +new Date, type = "single";
      if (lastDoubleClick && lastDoubleClick.time > now - 400 && posEq(lastDoubleClick.pos, start)) {
        type = "triple";
        e_preventDefault(e);
        setTimeout(focusInput, 20);
        selectLine(start.line);
      } else if (lastClick && lastClick.time > now - 400 && posEq(lastClick.pos, start)) {
        type = "double";
        lastDoubleClick = {time: now, pos: start};
        e_preventDefault(e);
        var word = findWordAt(start);
        setSelectionUser(word.from, word.to);
      } else { lastClick = {time: now, pos: start}; }

      function dragEnd(e2) {
        if (webkit) scroller.draggable = false;
        draggingText = false;
        up(); drop();
        if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
          e_preventDefault(e2);
          setCursor(start.line, start.ch, true);
          focusInput();
        }
      }
      var last = start, going;
      if (options.dragDrop && dragAndDrop && !options.readOnly && !posEq(sel.from, sel.to) &&
          !posLess(start, sel.from) && !posLess(sel.to, start) && type == "single") {
        // Let the drag handler handle this.
        if (webkit) scroller.draggable = true;
        var up = connect(document, "mouseup", operation(dragEnd), true);
        var drop = connect(scroller, "drop", operation(dragEnd), true);
        draggingText = true;
        // IE's approach to draggable
        if (scroller.dragDrop) scroller.dragDrop();
        return;
      }
      e_preventDefault(e);
      if (type == "single") setCursor(start.line, start.ch, true);

      var startstart = sel.from, startend = sel.to;

      function doSelect(cur) {
        if (type == "single") {
          setSelectionUser(start, cur);
        } else if (type == "double") {
          var word = findWordAt(cur);
          if (posLess(cur, startstart)) setSelectionUser(word.from, startend);
          else setSelectionUser(startstart, word.to);
        } else if (type == "triple") {
          if (posLess(cur, startstart)) setSelectionUser(startend, clipPos({line: cur.line, ch: 0}));
          else setSelectionUser(startstart, clipPos({line: cur.line + 1, ch: 0}));
        }
      }

      function extend(e) {
        var cur = posFromMouse(e, true);
        if (cur && !posEq(cur, last)) {
          if (!focused) onFocus();
          last = cur;
          doSelect(cur);
          updateInput = false;
          var visible = visibleLines();
          if (cur.line >= visible.to || cur.line < visible.from)
            going = setTimeout(operation(function(){extend(e);}), 150);
        }
      }

      function done(e) {
        clearTimeout(going);
        var cur = posFromMouse(e);
        if (cur) doSelect(cur);
        e_preventDefault(e);
        focusInput();
        updateInput = true;
        move(); up();
      }
      var move = connect(document, "mousemove", operation(function(e) {
        clearTimeout(going);
        e_preventDefault(e);
        if (!ie && !e_button(e)) done(e);
        else extend(e);
      }), true);
      var up = connect(document, "mouseup", operation(done), true);
    }
    function onDoubleClick(e) {
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == gutterText) return e_preventDefault(e);
      e_preventDefault(e);
    }
    function onDrop(e) {
      if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) return;
      e_preventDefault(e);
      var pos = posFromMouse(e, true), files = e.dataTransfer.files;
      if (!pos || options.readOnly) return;
      if (files && files.length && window.FileReader && window.File) {
        var n = files.length, text = Array(n), read = 0;
        var loadFile = function(file, i) {
          var reader = new FileReader;
          reader.onload = function() {
            text[i] = reader.result;
            if (++read == n) {
              pos = clipPos(pos);
              operation(function() {
                var end = replaceRange(text.join(""), pos, pos);
                setSelectionUser(pos, end);
              })();
            }
          };
          reader.readAsText(file);
        };
        for (var i = 0; i < n; ++i) loadFile(files[i], i);
      } else {
        // Don't do a replace if the drop happened inside of the selected text.
        if (draggingText && !(posLess(pos, sel.from) || posLess(sel.to, pos))) return;
        try {
          var text = e.dataTransfer.getData("Text");
          if (text) {
            compoundChange(function() {
              var curFrom = sel.from, curTo = sel.to;
              setSelectionUser(pos, pos);
              if (draggingText) replaceRange("", curFrom, curTo);
              replaceSelection(text);
              focusInput();
            });
          }
        }
        catch(e){}
      }
    }
    function onDragStart(e) {
      var txt = getSelection();
      e.dataTransfer.setData("Text", txt);

      // Use dummy image instead of default browsers image.
      if (gecko || chrome || opera) {
        var img = elt('img');
        img.scr = 'data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs='; //1x1 image
        e.dataTransfer.setDragImage(img, 0, 0);
      }
    }

    function doHandleBinding(bound, dropShift) {
      if (typeof bound == "string") {
        bound = commands[bound];
        if (!bound) return false;
      }
      var prevShift = shiftSelecting;
      try {
        if (options.readOnly) suppressEdits = true;
        if (dropShift) shiftSelecting = null;
        bound(instance);
      } catch(e) {
        if (e != Pass) throw e;
        return false;
      } finally {
        shiftSelecting = prevShift;
        suppressEdits = false;
      }
      return true;
    }
    var maybeTransition;
    function handleKeyBinding(e) {
      // Handle auto keymap transitions
      var startMap = getKeyMap(options.keyMap), next = startMap.auto;
      clearTimeout(maybeTransition);
      if (next && !isModifierKey(e)) maybeTransition = setTimeout(function() {
        if (getKeyMap(options.keyMap) == startMap) {
          options.keyMap = (next.call ? next.call(null, instance) : next);
        }
      }, 50);

      var name = keyNames[e_prop(e, "keyCode")], handled = false;
      if (name == null || e.altGraphKey) return false;
      if (e_prop(e, "altKey")) name = "Alt-" + name;
      if (e_prop(e, "ctrlKey")) name = "Ctrl-" + name;
      if (e_prop(e, "metaKey")) name = "Cmd-" + name;

      var stopped = false;
      function stop() { stopped = true; }

      if (e_prop(e, "shiftKey")) {
        handled = lookupKey("Shift-" + name, options.extraKeys, options.keyMap,
                            function(b) {return doHandleBinding(b, true);}, stop)
               || lookupKey(name, options.extraKeys, options.keyMap, function(b) {
                 if (typeof b == "string" && /^go[A-Z]/.test(b)) return doHandleBinding(b);
               }, stop);
      } else {
        handled = lookupKey(name, options.extraKeys, options.keyMap, doHandleBinding, stop);
      }
      if (stopped) handled = false;
      if (handled) {
        e_preventDefault(e);
        restartBlink();
        if (ie) { e.oldKeyCode = e.keyCode; e.keyCode = 0; }
      }
      return handled;
    }
    function handleCharBinding(e, ch) {
      var handled = lookupKey("'" + ch + "'", options.extraKeys,
                              options.keyMap, function(b) { return doHandleBinding(b, true); });
      if (handled) {
        e_preventDefault(e);
        restartBlink();
      }
      return handled;
    }

    var lastStoppedKey = null;
    function onKeyDown(e) {
      if (!focused) onFocus();
      if (ie && e.keyCode == 27) { e.returnValue = false; }
      if (pollingFast) { if (readInput()) pollingFast = false; }
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      var code = e_prop(e, "keyCode");
      // IE does strange things with escape.
      setShift(code == 16 || e_prop(e, "shiftKey"));
      // First give onKeyEvent option a chance to handle this.
      var handled = handleKeyBinding(e);
      if (opera) {
        lastStoppedKey = handled ? code : null;
        // Opera has no cut event... we try to at least catch the key combo
        if (!handled && code == 88 && e_prop(e, mac ? "metaKey" : "ctrlKey"))
          replaceSelection("");
      }
    }
    function onKeyPress(e) {
      if (pollingFast) readInput();
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      var keyCode = e_prop(e, "keyCode"), charCode = e_prop(e, "charCode");
      if (opera && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return;}
      if (((opera && (!e.which || e.which < 10)) || khtml) && handleKeyBinding(e)) return;
      var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
      if (options.electricChars && mode.electricChars && options.smartIndent && !options.readOnly) {
        if (mode.electricChars.indexOf(ch) > -1)
          setTimeout(operation(function() {indentLine(sel.to.line, "smart");}), 75);
      }
      if (handleCharBinding(e, ch)) return;
      fastPoll();
    }
    function onKeyUp(e) {
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      if (e_prop(e, "keyCode") == 16) shiftSelecting = null;
    }

    function onFocus() {
      if (options.readOnly == "nocursor") return;
      if (!focused) {
        if (options.onFocus) options.onFocus(instance);
        focused = true;
        if (scroller.className.search(/\bCodeMirror-focused\b/) == -1)
          scroller.className += " CodeMirror-focused";
        if (!leaveInputAlone) resetInput(true);
      }
      slowPoll();
      restartBlink();
    }
    function onBlur() {
      if (focused) {
        if (options.onBlur) options.onBlur(instance);
        focused = false;
        if (bracketHighlighted)
          operation(function(){
            if (bracketHighlighted) { bracketHighlighted(); bracketHighlighted = null; }
          })();
        scroller.className = scroller.className.replace(" CodeMirror-focused", "");
      }
      clearInterval(blinker);
      setTimeout(function() {if (!focused) shiftSelecting = null;}, 150);
    }

    // Replace the range from from to to by the strings in newText.
    // Afterwards, set the selection to selFrom, selTo.
    function updateLines(from, to, newText, selFrom, selTo) {
      if (suppressEdits) return;
      if (history) {
        var old = [];
        doc.iter(from.line, to.line + 1, function(line) { old.push(line.text); });
        history.addChange(from.line, newText.length, old);
        while (history.done.length > options.undoDepth) history.done.shift();
      }
      updateLinesNoUndo(from, to, newText, selFrom, selTo);
    }
    function unredoHelper(from, to) {
      if (!from.length) return;
      var set = from.pop(), out = [];
      for (var i = set.length - 1; i >= 0; i -= 1) {
        var change = set[i];
        var replaced = [], end = change.start + change.added;
        doc.iter(change.start, end, function(line) { replaced.push(line.text); });
        out.push({start: change.start, added: change.old.length, old: replaced});
        var pos = {line: change.start + change.old.length - 1,
                   ch: editEnd(replaced[replaced.length-1], change.old[change.old.length-1])};
        updateLinesNoUndo({line: change.start, ch: 0}, {line: end - 1, ch: getLine(end-1).text.length}, change.old, pos, pos);
      }
      updateInput = true;
      to.push(out);
    }
    function undo() {unredoHelper(history.done, history.undone);}
    function redo() {unredoHelper(history.undone, history.done);}

    function updateLinesNoUndo(from, to, newText, selFrom, selTo) {
      if (suppressEdits) return;
      var recomputeMaxLength = false, maxLineLength = maxLine.text.length;
      if (!options.lineWrapping)
        doc.iter(from.line, to.line + 1, function(line) {
          if (!line.hidden && line.text.length == maxLineLength) {recomputeMaxLength = true; return true;}
        });
      if (from.line != to.line || newText.length > 1) gutterDirty = true;

      var nlines = to.line - from.line, firstLine = getLine(from.line), lastLine = getLine(to.line);
      // First adjust the line structure, taking some care to leave highlighting intact.
      if (from.ch == 0 && to.ch == 0 && newText[newText.length - 1] == "") {
        // This is a whole-line replace. Treated specially to make
        // sure line objects move the way they are supposed to.
        var added = [], prevLine = null;
        if (from.line) {
          prevLine = getLine(from.line - 1);
          prevLine.fixMarkEnds(lastLine);
        } else lastLine.fixMarkStarts();
        for (var i = 0, e = newText.length - 1; i < e; ++i)
          added.push(Line.inheritMarks(newText[i], prevLine));
        if (nlines) doc.remove(from.line, nlines, callbacks);
        if (added.length) doc.insert(from.line, added);
      } else if (firstLine == lastLine) {
        if (newText.length == 1)
          firstLine.replace(from.ch, to.ch, newText[0]);
        else {
          lastLine = firstLine.split(to.ch, newText[newText.length-1]);
          firstLine.replace(from.ch, null, newText[0]);
          firstLine.fixMarkEnds(lastLine);
          var added = [];
          for (var i = 1, e = newText.length - 1; i < e; ++i)
            added.push(Line.inheritMarks(newText[i], firstLine));
          added.push(lastLine);
          doc.insert(from.line + 1, added);
        }
      } else if (newText.length == 1) {
        firstLine.replace(from.ch, null, newText[0]);
        lastLine.replace(null, to.ch, "");
        firstLine.append(lastLine);
        doc.remove(from.line + 1, nlines, callbacks);
      } else {
        var added = [];
        firstLine.replace(from.ch, null, newText[0]);
        lastLine.replace(null, to.ch, newText[newText.length-1]);
        firstLine.fixMarkEnds(lastLine);
        for (var i = 1, e = newText.length - 1; i < e; ++i)
          added.push(Line.inheritMarks(newText[i], firstLine));
        if (nlines > 1) doc.remove(from.line + 1, nlines - 1, callbacks);
        doc.insert(from.line + 1, added);
      }
      if (options.lineWrapping) {
        var perLine = Math.max(5, scroller.clientWidth / charWidth() - 3);
        doc.iter(from.line, from.line + newText.length, function(line) {
          if (line.hidden) return;
          var guess = Math.ceil(line.text.length / perLine) || 1;
          if (guess != line.height) updateLineHeight(line, guess);
        });
      } else {
        doc.iter(from.line, from.line + newText.length, function(line) {
          var l = line.text;
          if (!line.hidden && l.length > maxLineLength) {
            maxLine = line; maxLineLength = l.length; maxLineChanged = true;
            recomputeMaxLength = false;
          }
        });
        if (recomputeMaxLength) updateMaxLine = true;
      }

      // Add these lines to the work array, so that they will be
      // highlighted. Adjust work lines if lines were added/removed.
      var newWork = [], lendiff = newText.length - nlines - 1;
      for (var i = 0, l = work.length; i < l; ++i) {
        var task = work[i];
        if (task < from.line) newWork.push(task);
        else if (task > to.line) newWork.push(task + lendiff);
      }
      var hlEnd = from.line + Math.min(newText.length, 500);
      highlightLines(from.line, hlEnd);
      newWork.push(hlEnd);
      work = newWork;
      startWorker(100);
      // Remember that these lines changed, for updating the display
      changes.push({from: from.line, to: to.line + 1, diff: lendiff});
      var changeObj = {from: from, to: to, text: newText};
      if (textChanged) {
        for (var cur = textChanged; cur.next; cur = cur.next) {}
        cur.next = changeObj;
      } else textChanged = changeObj;

      // Update the selection
      function updateLine(n) {return n <= Math.min(to.line, to.line + lendiff) ? n : n + lendiff;}
      setSelection(clipPos(selFrom), clipPos(selTo),
                   updateLine(sel.from.line), updateLine(sel.to.line));
    }

    function needsScrollbar() {
      var realHeight = doc.height * textHeight() + 2 * paddingTop();
      return realHeight - 1 > scroller.offsetHeight ? realHeight : false;
    }

    function updateVerticalScroll(scrollTop) {
      var scrollHeight = needsScrollbar();
      scrollbar.style.display = scrollHeight ? "block" : "none";
      if (scrollHeight) {
        scrollbarInner.style.height = sizer.style.minHeight = scrollHeight + "px";
        scrollbar.style.height = scroller.clientHeight + "px";
        if (scrollTop != null) {
          scrollbar.scrollTop = scroller.scrollTop = scrollTop;
          // 'Nudge' the scrollbar to work around a Webkit bug where,
          // in some situations, we'd end up with a scrollbar that
          // reported its scrollTop (and looked) as expected, but
          // *behaved* as if it was still in a previous state (i.e.
          // couldn't scroll up, even though it appeared to be at the
          // bottom).
          if (webkit) setTimeout(function() {
            if (scrollbar.scrollTop != scrollTop) return;
            scrollbar.scrollTop = scrollTop + (scrollTop ? -1 : 1);
            scrollbar.scrollTop = scrollTop;
          }, 0);
        }
      } else {
        sizer.style.minHeight = "";
      }
      // Position the mover div to align with the current virtual scroll position
      mover.style.top = displayOffset * textHeight() + "px";
    }

    // On Mac OS X Lion and up, detect whether the mouse is plugged in by measuring
    // the width of a div with a scrollbar in it. If the width is <= 1, then
    // the mouse isn't plugged in and scrollbars should overlap the content.
    function overlapScrollbars() {
      var tmpSbInner = elt("div", null, "CodeMirror-scrollbar-inner", "height: 200px");
      var tmpSb = elt("div", [tmpSbInner], "CodeMirror-scrollbar", "position: absolute; left: -9999px; height: 100px;");
      document.body.appendChild(tmpSb);
      var result = (tmpSb.offsetWidth <= 1);
      document.body.removeChild(tmpSb);
      return result;
    }

    function computeMaxLength() {
      maxLine = getLine(0); maxLineChanged = true;
      var maxLineLength = maxLine.text.length;
      doc.iter(1, doc.size, function(line) {
        var l = line.text;
        if (!line.hidden && l.length > maxLineLength) {
          maxLineLength = l.length; maxLine = line;
        }
      });
      updateMaxLine = false;
    }

    function replaceRange(code, from, to) {
      from = clipPos(from);
      if (!to) to = from; else to = clipPos(to);
      code = splitLines(code);
      function adjustPos(pos) {
        if (posLess(pos, from)) return pos;
        if (!posLess(to, pos)) return end;
        var line = pos.line + code.length - (to.line - from.line) - 1;
        var ch = pos.ch;
        if (pos.line == to.line)
          ch += code[code.length-1].length - (to.ch - (to.line == from.line ? from.ch : 0));
        return {line: line, ch: ch};
      }
      var end;
      replaceRange1(code, from, to, function(end1) {
        end = end1;
        return {from: adjustPos(sel.from), to: adjustPos(sel.to)};
      });
      return end;
    }
    function replaceSelection(code, collapse) {
      replaceRange1(splitLines(code), sel.from, sel.to, function(end) {
        if (collapse == "end") return {from: end, to: end};
        else if (collapse == "start") return {from: sel.from, to: sel.from};
        else return {from: sel.from, to: end};
      });
    }
    function replaceRange1(code, from, to, computeSel) {
      var endch = code.length == 1 ? code[0].length + from.ch : code[code.length-1].length;
      var newSel = computeSel({line: from.line + code.length - 1, ch: endch});
      updateLines(from, to, code, newSel.from, newSel.to);
    }

    function getRange(from, to, lineSep) {
      var l1 = from.line, l2 = to.line;
      if (l1 == l2) return getLine(l1).text.slice(from.ch, to.ch);
      var code = [getLine(l1).text.slice(from.ch)];
      doc.iter(l1 + 1, l2, function(line) { code.push(line.text); });
      code.push(getLine(l2).text.slice(0, to.ch));
      return code.join(lineSep || "\n");
    }
    function getSelection(lineSep) {
      return getRange(sel.from, sel.to, lineSep);
    }

    function slowPoll() {
      if (pollingFast) return;
      poll.set(options.pollInterval, function() {
        startOperation();
        readInput();
        if (focused) slowPoll();
        endOperation();
      });
    }
    function fastPoll() {
      var missed = false;
      pollingFast = true;
      function p() {
        startOperation();
        var changed = readInput();
        if (!changed && !missed) {missed = true; poll.set(60, p);}
        else {pollingFast = false; slowPoll();}
        endOperation();
      }
      poll.set(20, p);
    }

    // Previnput is a hack to work with IME. If we reset the textarea
    // on every change, that breaks IME. So we look for changes
    // compared to the previous content instead. (Modern browsers have
    // events that indicate IME taking place, but these are not widely
    // supported or compatible enough yet to rely on.)
    var prevInput = "";
    function readInput() {
      if (leaveInputAlone || !focused || hasSelection(input) || options.readOnly) return false;
      var text = input.value;
      if (text == prevInput) return false;
      shiftSelecting = null;
      var same = 0, l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput[same] == text[same]) ++same;
      if (same < prevInput.length)
        sel.from = {line: sel.from.line, ch: sel.from.ch - (prevInput.length - same)};
      else if (overwrite && posEq(sel.from, sel.to))
        sel.to = {line: sel.to.line, ch: Math.min(getLine(sel.to.line).text.length, sel.to.ch + (text.length - same))};
      replaceSelection(text.slice(same), "end");
      if (text.length > 1000) { input.value = prevInput = ""; }
      else prevInput = text;
      return true;
    }
    function resetInput(user) {
      if (!posEq(sel.from, sel.to)) {
        prevInput = "";
        input.value = getSelection();
        selectInput(input);
      } else if (user) prevInput = input.value = "";
    }

    function focusInput() {
      if (options.readOnly != "nocursor") input.focus();
    }

    function scrollCursorIntoView() {
      var coords = calculateCursorCoords();
      scrollIntoView(coords.x, coords.y, coords.x, coords.yBot);
    }
    function calculateCursorCoords() {
      var cursor = localCoords(sel.inverted ? sel.from : sel.to);
      var x = options.lineWrapping ? Math.min(cursor.x, lineSpace.offsetWidth) : cursor.x;
      return {x: x, y: cursor.y, yBot: cursor.yBot};
    }
    function scrollIntoView(x1, y1, x2, y2) {
      var scrollPos = calculateScrollPos(x1, y1, x2, y2);
      if (scrollPos.scrollLeft != null) {scroller.scrollLeft = scrollPos.scrollLeft;}
      if (scrollPos.scrollTop != null) {scrollbar.scrollTop = scroller.scrollTop = scrollPos.scrollTop;}
    }
    function calculateScrollPos(x1, y1, x2, y2) {
      var pl = paddingLeft(), pt = paddingTop();
      y1 += pt; y2 += pt; x1 += pl; x2 += pl;
      var screen = scroller.clientHeight, screentop = scrollbar.scrollTop, result = {};
      var docBottom = needsScrollbar() || Infinity;
      var atTop = y1 < pt + 10, atBottom = y2 + pt > docBottom - 10;
      if (y1 < screentop) result.scrollTop = atTop ? 0 : Math.max(0, y1);
      else if (y2 > screentop + screen) result.scrollTop = (atBottom ? docBottom : y2) - screen;

      var screenw = scroller.clientWidth, screenleft = scroller.scrollLeft;
      var gutterw = options.fixedGutter ? gutter.clientWidth : 0;
      var atLeft = x1 < gutterw + pl + 10;
      if (x1 < screenleft + gutterw || atLeft) {
        if (atLeft) x1 = 0;
        result.scrollLeft = Math.max(0, x1 - 10 - gutterw);
      } else if (x2 > screenw + screenleft - 3) {
        result.scrollLeft = x2 + 10 - screenw;
      }
      return result;
    }

    function visibleLines(scrollTop) {
      var lh = textHeight(), top = (scrollTop != null ? scrollTop : scrollbar.scrollTop) - paddingTop();
      var fromHeight = Math.max(0, Math.floor(top / lh));
      var toHeight = Math.ceil((top + scroller.clientHeight) / lh);
      return {from: lineAtHeight(doc, fromHeight),
              to: lineAtHeight(doc, toHeight)};
    }
    // Uses a set of changes plus the current scroll position to
    // determine which DOM updates have to be made, and makes the
    // updates.
    function updateDisplay(changes, suppressCallback, scrollTop) {
      if (!scroller.clientWidth) {
        showingFrom = showingTo = displayOffset = 0;
        return;
      }
      // Compute the new visible window
      // If scrollTop is specified, use that to determine which lines
      // to render instead of the current scrollbar position.
      var visible = visibleLines(scrollTop);
      // Bail out if the visible area is already rendered and nothing changed.
      if (changes !== true && changes.length == 0 && visible.from > showingFrom && visible.to < showingTo) {
        updateVerticalScroll(scrollTop);
        return;
      }
      var from = Math.max(visible.from - 100, 0), to = Math.min(doc.size, visible.to + 100);
      if (showingFrom < from && from - showingFrom < 20) from = showingFrom;
      if (showingTo > to && showingTo - to < 20) to = Math.min(doc.size, showingTo);

      // Create a range of theoretically intact lines, and punch holes
      // in that using the change info.
      var intact = changes === true ? [] :
        computeIntact([{from: showingFrom, to: showingTo, domStart: 0}], changes);
      // Clip off the parts that won't be visible
      var intactLines = 0;
      for (var i = 0; i < intact.length; ++i) {
        var range = intact[i];
        if (range.from < from) {range.domStart += (from - range.from); range.from = from;}
        if (range.to > to) range.to = to;
        if (range.from >= range.to) intact.splice(i--, 1);
        else intactLines += range.to - range.from;
      }
      if (intactLines == to - from && from == showingFrom && to == showingTo) {
        updateVerticalScroll(scrollTop);
        return;
      }
      intact.sort(function(a, b) {return a.domStart - b.domStart;});

      var th = textHeight(), gutterDisplay = gutter.style.display;
      lineDiv.style.display = "none";
      patchDisplay(from, to, intact);
      lineDiv.style.display = gutter.style.display = "";

      var different = from != showingFrom || to != showingTo || lastSizeC != scroller.clientHeight + th;
      // This is just a bogus formula that detects when the editor is
      // resized or the font size changes.
      if (different) lastSizeC = scroller.clientHeight + th;
      if (from != showingFrom || to != showingTo && options.onViewportChange)
        setTimeout(function(){
          if (options.onViewportChange) options.onViewportChange(instance, from, to);
        });
      showingFrom = from; showingTo = to;
      displayOffset = heightAtLine(doc, from);

      // Since this is all rather error prone, it is honoured with the
      // only assertion in the whole file.
      if (lineDiv.childNodes.length != showingTo - showingFrom)
        throw new Error("BAD PATCH! " + JSON.stringify(intact) + " size=" + (showingTo - showingFrom) +
                        " nodes=" + lineDiv.childNodes.length);

      function checkHeights() {
        var curNode = lineDiv.firstChild, heightChanged = false;
        doc.iter(showingFrom, showingTo, function(line) {
          // Work around bizarro IE7 bug where, sometimes, our curNode
          // is magically replaced with a new node in the DOM, leaving
          // us with a reference to an orphan (nextSibling-less) node.
          if (!curNode) return;
          if (!line.hidden) {
            var height = Math.round(curNode.offsetHeight / th) || 1;
            if (line.height != height) {
              updateLineHeight(line, height);
              gutterDirty = heightChanged = true;
            }
          }
          curNode = curNode.nextSibling;
        });
        return heightChanged;
      }

      if (options.lineWrapping) {
        checkHeights();
        var scrollHeight = needsScrollbar();
        var shouldHaveScrollbar = scrollHeight ? "block" : "none";
        if (scrollbar.style.display != shouldHaveScrollbar) {
          scrollbar.style.display = shouldHaveScrollbar;
          if (scrollHeight) scrollbarInner.style.height = scrollHeight + "px";
          checkHeights();
        }
      }

      gutter.style.display = gutterDisplay;
      if (different || gutterDirty) {
        // If the gutter grew in size, re-check heights. If those changed, re-draw gutter.
        updateGutter() && options.lineWrapping && checkHeights() && updateGutter();
      }
      updateVerticalScroll(scrollTop);
      updateSelection();
      if (!suppressCallback && options.onUpdate) options.onUpdate(instance);
      return true;
    }

    function computeIntact(intact, changes) {
      for (var i = 0, l = changes.length || 0; i < l; ++i) {
        var change = changes[i], intact2 = [], diff = change.diff || 0;
        for (var j = 0, l2 = intact.length; j < l2; ++j) {
          var range = intact[j];
          if (change.to <= range.from && change.diff)
            intact2.push({from: range.from + diff, to: range.to + diff,
                          domStart: range.domStart});
          else if (change.to <= range.from || change.from >= range.to)
            intact2.push(range);
          else {
            if (change.from > range.from)
              intact2.push({from: range.from, to: change.from, domStart: range.domStart});
            if (change.to < range.to)
              intact2.push({from: change.to + diff, to: range.to + diff,
                            domStart: range.domStart + (change.to - range.from)});
          }
        }
        intact = intact2;
      }
      return intact;
    }

    function patchDisplay(from, to, intact) {
      function killNode(node) {
        var tmp = node.nextSibling;
        node.parentNode.removeChild(node);
        return tmp;
      }
      // The first pass removes the DOM nodes that aren't intact.
      if (!intact.length) removeChildren(lineDiv);
      else {
        var domPos = 0, curNode = lineDiv.firstChild, n;
        for (var i = 0; i < intact.length; ++i) {
          var cur = intact[i];
          while (cur.domStart > domPos) {curNode = killNode(curNode); domPos++;}
          for (var j = 0, e = cur.to - cur.from; j < e; ++j) {curNode = curNode.nextSibling; domPos++;}
        }
        while (curNode) curNode = killNode(curNode);
      }
      // This pass fills in the lines that actually changed.
      var nextIntact = intact.shift(), curNode = lineDiv.firstChild, j = from;
      doc.iter(from, to, function(line) {
        if (nextIntact && nextIntact.to == j) nextIntact = intact.shift();
        if (!nextIntact || nextIntact.from > j) {
          if (line.hidden) var lineElement = elt("pre");
          else {
            var lineElement = line.getElement(makeTab);
            if (line.className) lineElement.className = line.className;
            // Kludge to make sure the styled element lies behind the selection (by z-index)
            if (line.bgClassName) {
              var pre = elt("pre", "\u00a0", line.bgClassName, "position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2");
              lineElement = elt("div", [pre, lineElement], null, "position: relative");
            }
          }
          lineDiv.insertBefore(lineElement, curNode);
        } else {
          curNode = curNode.nextSibling;
        }
        ++j;
      });
    }

    function updateGutter() {
      if (!options.gutter && !options.lineNumbers) return;
      var hText = mover.offsetHeight, hEditor = scroller.clientHeight;
      gutter.style.height = (hText - hEditor < 2 ? hEditor : hText) + "px";
      var fragment = document.createDocumentFragment(), i = showingFrom, normalNode;
      doc.iter(showingFrom, Math.max(showingTo, showingFrom + 1), function(line) {
        if (line.hidden) {
          fragment.appendChild(elt("pre"));
        } else {
          var marker = line.gutterMarker;
          var text = options.lineNumbers ? options.lineNumberFormatter(i + options.firstLineNumber) : null;
          if (marker && marker.text)
            text = marker.text.replace("%N%", text != null ? text : "");
          else if (text == null)
            text = "\u00a0";
          var markerElement = fragment.appendChild(elt("pre", null, marker && marker.style));
          markerElement.innerHTML = text;
          for (var j = 1; j < line.height; ++j) {
            markerElement.appendChild(elt("br"));
            markerElement.appendChild(document.createTextNode("\u00a0"));
          }
          if (!marker) normalNode = i;
        }
        ++i;
      });
      gutter.style.display = "none";
      removeChildrenAndAdd(gutterText, fragment);
      // Make sure scrolling doesn't cause number gutter size to pop
      if (normalNode != null && options.lineNumbers) {
        var node = gutterText.childNodes[normalNode - showingFrom];
        var minwidth = String(doc.size).length, val = eltText(node.firstChild), pad = "";
        while (val.length + pad.length < minwidth) pad += "\u00a0";
        if (pad) node.insertBefore(document.createTextNode(pad), node.firstChild);
      }
      gutter.style.display = "";
      var resized = Math.abs((parseInt(lineSpace.style.marginLeft) || 0) - gutter.offsetWidth) > 2;
      lineSpace.style.marginLeft = gutter.offsetWidth + "px";
      gutterDirty = false;
      return resized;
    }
    function updateSelection() {
      var collapsed = posEq(sel.from, sel.to);
      var fromPos = localCoords(sel.from, true);
      var toPos = collapsed ? fromPos : localCoords(sel.to, true);
      var headPos = sel.inverted ? fromPos : toPos, th = textHeight();
      var wrapOff = eltOffset(wrapper), lineOff = eltOffset(lineDiv);
      inputDiv.style.top = Math.max(0, Math.min(scroller.offsetHeight, headPos.y + lineOff.top - wrapOff.top)) + "px";
      inputDiv.style.left = Math.max(0, Math.min(scroller.offsetWidth, headPos.x + lineOff.left - wrapOff.left)) + "px";
      if (collapsed) {
        cursor.style.top = headPos.y + "px";
        cursor.style.left = (options.lineWrapping ? Math.min(headPos.x, lineSpace.offsetWidth) : headPos.x) + "px";
        cursor.style.display = "";
        selectionDiv.style.display = "none";
      } else {
        var sameLine = fromPos.y == toPos.y, fragment = document.createDocumentFragment();
        var clientWidth = lineSpace.clientWidth || lineSpace.offsetWidth;
        var clientHeight = lineSpace.clientHeight || lineSpace.offsetHeight;
        var add = function(left, top, right, height) {
          var rstyle = quirksMode ? "width: " + (!right ? clientWidth : clientWidth - right - left) + "px"
                                  : "right: " + right + "px";
          fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left +
                                   "px; top: " + top + "px; " + rstyle + "; height: " + height + "px"));
        };
        if (sel.from.ch && fromPos.y >= 0) {
          var right = sameLine ? clientWidth - toPos.x : 0;
          add(fromPos.x, fromPos.y, right, th);
        }
        var middleStart = Math.max(0, fromPos.y + (sel.from.ch ? th : 0));
        var middleHeight = Math.min(toPos.y, clientHeight) - middleStart;
        if (middleHeight > 0.2 * th)
          add(0, middleStart, 0, middleHeight);
        if ((!sameLine || !sel.from.ch) && toPos.y < clientHeight - .5 * th)
          add(0, toPos.y, clientWidth - toPos.x, th);
        removeChildrenAndAdd(selectionDiv, fragment);
        cursor.style.display = "none";
        selectionDiv.style.display = "";
      }
    }

    function setShift(val) {
      if (val) shiftSelecting = shiftSelecting || (sel.inverted ? sel.to : sel.from);
      else shiftSelecting = null;
    }
    function setSelectionUser(from, to) {
      var sh = shiftSelecting && clipPos(shiftSelecting);
      if (sh) {
        if (posLess(sh, from)) from = sh;
        else if (posLess(to, sh)) to = sh;
      }
      setSelection(from, to);
      userSelChange = true;
    }
    // Update the selection. Last two args are only used by
    // updateLines, since they have to be expressed in the line
    // numbers before the update.
    function setSelection(from, to, oldFrom, oldTo) {
      goalColumn = null;
      if (oldFrom == null) {oldFrom = sel.from.line; oldTo = sel.to.line;}
      if (posEq(sel.from, from) && posEq(sel.to, to)) return;
      if (posLess(to, from)) {var tmp = to; to = from; from = tmp;}

      // Skip over hidden lines.
      if (from.line != oldFrom) {
        var from1 = skipHidden(from, oldFrom, sel.from.ch);
        // If there is no non-hidden line left, force visibility on current line
        if (!from1) setLineHidden(from.line, false);
        else from = from1;
      }
      if (to.line != oldTo) to = skipHidden(to, oldTo, sel.to.ch);

      if (posEq(from, to)) sel.inverted = false;
      else if (posEq(from, sel.to)) sel.inverted = false;
      else if (posEq(to, sel.from)) sel.inverted = true;

      if (options.autoClearEmptyLines && posEq(sel.from, sel.to)) {
        var head = sel.inverted ? from : to;
        if (head.line != sel.from.line && sel.from.line < doc.size) {
          var oldLine = getLine(sel.from.line);
          if (/^\s+$/.test(oldLine.text))
            setTimeout(operation(function() {
              if (oldLine.parent && /^\s+$/.test(oldLine.text)) {
                var no = lineNo(oldLine);
                replaceRange("", {line: no, ch: 0}, {line: no, ch: oldLine.text.length});
              }
            }, 10));
        }
      }

      sel.from = from; sel.to = to;
      selectionChanged = true;
    }
    function skipHidden(pos, oldLine, oldCh) {
      function getNonHidden(dir) {
        var lNo = pos.line + dir, end = dir == 1 ? doc.size : -1;
        while (lNo != end) {
          var line = getLine(lNo);
          if (!line.hidden) {
            var ch = pos.ch;
            if (toEnd || ch > oldCh || ch > line.text.length) ch = line.text.length;
            return {line: lNo, ch: ch};
          }
          lNo += dir;
        }
      }
      var line = getLine(pos.line);
      var toEnd = pos.ch == line.text.length && pos.ch != oldCh;
      if (!line.hidden) return pos;
      if (pos.line >= oldLine) return getNonHidden(1) || getNonHidden(-1);
      else return getNonHidden(-1) || getNonHidden(1);
    }
    function setCursor(line, ch, user) {
      var pos = clipPos({line: line, ch: ch || 0});
      (user ? setSelectionUser : setSelection)(pos, pos);
    }

    function clipLine(n) {return Math.max(0, Math.min(n, doc.size-1));}
    function clipPos(pos) {
      if (pos.line < 0) return {line: 0, ch: 0};
      if (pos.line >= doc.size) return {line: doc.size-1, ch: getLine(doc.size-1).text.length};
      var ch = pos.ch, linelen = getLine(pos.line).text.length;
      if (ch == null || ch > linelen) return {line: pos.line, ch: linelen};
      else if (ch < 0) return {line: pos.line, ch: 0};
      else return pos;
    }

    function findPosH(dir, unit) {
      var end = sel.inverted ? sel.from : sel.to, line = end.line, ch = end.ch;
      var lineObj = getLine(line);
      function findNextLine() {
        for (var l = line + dir, e = dir < 0 ? -1 : doc.size; l != e; l += dir) {
          var lo = getLine(l);
          if (!lo.hidden) { line = l; lineObj = lo; return true; }
        }
      }
      function moveOnce(boundToLine) {
        if (ch == (dir < 0 ? 0 : lineObj.text.length)) {
          if (!boundToLine && findNextLine()) ch = dir < 0 ? lineObj.text.length : 0;
          else return false;
        } else ch += dir;
        return true;
      }
      if (unit == "char") moveOnce();
      else if (unit == "column") moveOnce(true);
      else if (unit == "word") {
        var sawWord = false;
        for (;;) {
          if (dir < 0) if (!moveOnce()) break;
          if (isWordChar(lineObj.text.charAt(ch))) sawWord = true;
          else if (sawWord) {if (dir < 0) {dir = 1; moveOnce();} break;}
          if (dir > 0) if (!moveOnce()) break;
        }
      }
      return {line: line, ch: ch};
    }
    function moveH(dir, unit) {
      var pos = dir < 0 ? sel.from : sel.to;
      if (shiftSelecting || posEq(sel.from, sel.to)) pos = findPosH(dir, unit);
      setCursor(pos.line, pos.ch, true);
    }
    function deleteH(dir, unit) {
      if (!posEq(sel.from, sel.to)) replaceRange("", sel.from, sel.to);
      else if (dir < 0) replaceRange("", findPosH(dir, unit), sel.to);
      else replaceRange("", sel.from, findPosH(dir, unit));
      userSelChange = true;
    }
    function moveV(dir, unit) {
      var dist = 0, pos = localCoords(sel.inverted ? sel.from : sel.to, true);
      if (goalColumn != null) pos.x = goalColumn;
      if (unit == "page") dist = Math.min(scroller.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      else if (unit == "line") dist = textHeight();
      var target = coordsChar(pos.x, pos.y + dist * dir + 2);
      if (unit == "page") scrollbar.scrollTop += localCoords(target, true).y - pos.y;
      setCursor(target.line, target.ch, true);
      goalColumn = pos.x;
    }

    function findWordAt(pos) {
      var line = getLine(pos.line).text;
      var start = pos.ch, end = pos.ch;
      if (line) {
        if (pos.after === false || end == line.length) --start; else ++end;
        var startChar = line.charAt(start);
        var check = isWordChar(startChar) ? isWordChar :
                    /\s/.test(startChar) ? function(ch) {return /\s/.test(ch);} :
                    function(ch) {return !/\s/.test(ch) && !isWordChar(ch);};
        while (start > 0 && check(line.charAt(start - 1))) --start;
        while (end < line.length && check(line.charAt(end))) ++end;
      }
      return {from: {line: pos.line, ch: start}, to: {line: pos.line, ch: end}};
    }
    function selectLine(line) {
      setSelectionUser({line: line, ch: 0}, clipPos({line: line + 1, ch: 0}));
    }
    function indentSelected(mode) {
      if (posEq(sel.from, sel.to)) return indentLine(sel.from.line, mode);
      var e = sel.to.line - (sel.to.ch ? 0 : 1);
      for (var i = sel.from.line; i <= e; ++i) indentLine(i, mode);
    }

    function indentLine(n, how) {
      if (!how) how = "add";
      if (how == "smart") {
        if (!mode.indent) how = "prev";
        else var state = getStateBefore(n);
      }

      var line = getLine(n), curSpace = line.indentation(options.tabSize),
          curSpaceString = line.text.match(/^\s*/)[0], indentation;
      if (how == "smart") {
        indentation = mode.indent(state, line.text.slice(curSpaceString.length), line.text);
        if (indentation == Pass) how = "prev";
      }
      if (how == "prev") {
        if (n) indentation = getLine(n-1).indentation(options.tabSize);
        else indentation = 0;
      }
      else if (how == "add") indentation = curSpace + options.indentUnit;
      else if (how == "subtract") indentation = curSpace - options.indentUnit;
      indentation = Math.max(0, indentation);
      var diff = indentation - curSpace;

      var indentString = "", pos = 0;
      if (options.indentWithTabs)
        for (var i = Math.floor(indentation / options.tabSize); i; --i) {pos += options.tabSize; indentString += "\t";}
      while (pos < indentation) {++pos; indentString += " ";}

      if (indentString != curSpaceString)
        replaceRange(indentString, {line: n, ch: 0}, {line: n, ch: curSpaceString.length});
    }

    function loadMode() {
      mode = CodeMirror.getMode(options, options.mode);
      doc.iter(0, doc.size, function(line) { line.stateAfter = null; });
      work = [0];
      startWorker();
    }
    function gutterChanged() {
      var visible = options.gutter || options.lineNumbers;
      gutter.style.display = visible ? "" : "none";
      if (visible) gutterDirty = true;
      else lineDiv.parentNode.style.marginLeft = 0;
    }
    function wrappingChanged(from, to) {
      if (options.lineWrapping) {
        wrapper.className += " CodeMirror-wrap";
        var perLine = scroller.clientWidth / charWidth() - 3;
        doc.iter(0, doc.size, function(line) {
          if (line.hidden) return;
          var guess = Math.ceil(line.text.length / perLine) || 1;
          if (guess != 1) updateLineHeight(line, guess);
        });
        lineSpace.style.minWidth = widthForcer.style.left = "";
      } else {
        wrapper.className = wrapper.className.replace(" CodeMirror-wrap", "");
        computeMaxLength();
        doc.iter(0, doc.size, function(line) {
          if (line.height != 1 && !line.hidden) updateLineHeight(line, 1);
        });
      }
      changes.push({from: 0, to: doc.size});
    }
    function makeTab(col) {
      var w = options.tabSize - col % options.tabSize, cached = tabCache[w];
      if (cached) return cached;
      for (var str = "", i = 0; i < w; ++i) str += " ";
      var span = elt("span", str, "cm-tab");
      return (tabCache[w] = {element: span, width: w});
    }
    function themeChanged() {
      scroller.className = scroller.className.replace(/\s*cm-s-\S+/g, "") +
        options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    }
    function keyMapChanged() {
      var style = keyMap[options.keyMap].style;
      wrapper.className = wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
        (style ? " cm-keymap-" + style : "");
    }

    function TextMarker() { this.set = []; }
    TextMarker.prototype.clear = operation(function() {
      var min = Infinity, max = -Infinity;
      for (var i = 0, e = this.set.length; i < e; ++i) {
        var line = this.set[i], mk = line.marked;
        if (!mk || !line.parent) continue;
        var lineN = lineNo(line);
        min = Math.min(min, lineN); max = Math.max(max, lineN);
        for (var j = 0; j < mk.length; ++j)
          if (mk[j].marker == this) mk.splice(j--, 1);
      }
      if (min != Infinity)
        changes.push({from: min, to: max + 1});
    });
    TextMarker.prototype.find = function() {
      var from, to;
      for (var i = 0, e = this.set.length; i < e; ++i) {
        var line = this.set[i], mk = line.marked;
        for (var j = 0; j < mk.length; ++j) {
          var mark = mk[j];
          if (mark.marker == this) {
            if (mark.from != null || mark.to != null) {
              var found = lineNo(line);
              if (found != null) {
                if (mark.from != null) from = {line: found, ch: mark.from};
                if (mark.to != null) to = {line: found, ch: mark.to};
              }
            }
          }
        }
      }
      return {from: from, to: to};
    };

    function markText(from, to, className) {
      from = clipPos(from); to = clipPos(to);
      var tm = new TextMarker();
      if (!posLess(from, to)) return tm;
      function add(line, from, to, className) {
        getLine(line).addMark(new MarkedText(from, to, className, tm));
      }
      if (from.line == to.line) add(from.line, from.ch, to.ch, className);
      else {
        add(from.line, from.ch, null, className);
        for (var i = from.line + 1, e = to.line; i < e; ++i)
          add(i, null, null, className);
        add(to.line, null, to.ch, className);
      }
      changes.push({from: from.line, to: to.line + 1});
      return tm;
    }

    function setBookmark(pos) {
      pos = clipPos(pos);
      var bm = new Bookmark(pos.ch);
      getLine(pos.line).addMark(bm);
      return bm;
    }

    function findMarksAt(pos) {
      pos = clipPos(pos);
      var markers = [], marked = getLine(pos.line).marked;
      if (!marked) return markers;
      for (var i = 0, e = marked.length; i < e; ++i) {
        var m = marked[i];
        if ((m.from == null || m.from <= pos.ch) &&
            (m.to == null || m.to >= pos.ch))
          markers.push(m.marker || m);
      }
      return markers;
    }

    function addGutterMarker(line, text, className) {
      if (typeof line == "number") line = getLine(clipLine(line));
      line.gutterMarker = {text: text, style: className};
      gutterDirty = true;
      return line;
    }
    function removeGutterMarker(line) {
      if (typeof line == "number") line = getLine(clipLine(line));
      line.gutterMarker = null;
      gutterDirty = true;
    }

    function changeLine(handle, op) {
      var no = handle, line = handle;
      if (typeof handle == "number") line = getLine(clipLine(handle));
      else no = lineNo(handle);
      if (no == null) return null;
      if (op(line, no)) changes.push({from: no, to: no + 1});
      else return null;
      return line;
    }
    function setLineClass(handle, className, bgClassName) {
      return changeLine(handle, function(line) {
        if (line.className != className || line.bgClassName != bgClassName) {
          line.className = className;
          line.bgClassName = bgClassName;
          return true;
        }
      });
    }
    function setLineHidden(handle, hidden) {
      return changeLine(handle, function(line, no) {
        if (line.hidden != hidden) {
          line.hidden = hidden;
          if (!options.lineWrapping) {
            if (hidden && line.text.length == maxLine.text.length) {
              updateMaxLine = true;
            } else if (!hidden && line.text.length > maxLine.text.length) {
              maxLine = line; updateMaxLine = false;
            }
          }
          updateLineHeight(line, hidden ? 0 : 1);
          var fline = sel.from.line, tline = sel.to.line;
          if (hidden && (fline == no || tline == no)) {
            var from = fline == no ? skipHidden({line: fline, ch: 0}, fline, 0) : sel.from;
            var to = tline == no ? skipHidden({line: tline, ch: 0}, tline, 0) : sel.to;
            // Can't hide the last visible line, we'd have no place to put the cursor
            if (!to) return;
            setSelection(from, to);
          }
          return (gutterDirty = true);
        }
      });
    }

    function lineInfo(line) {
      if (typeof line == "number") {
        if (!isLine(line)) return null;
        var n = line;
        line = getLine(line);
        if (!line) return null;
      } else {
        var n = lineNo(line);
        if (n == null) return null;
      }
      var marker = line.gutterMarker;
      return {line: n, handle: line, text: line.text, markerText: marker && marker.text,
              markerClass: marker && marker.style, lineClass: line.className, bgClass: line.bgClassName};
    }

    // These are used to go from pixel positions to character
    // positions, taking varying character widths into account.
    function charFromX(line, x) {
      if (x <= 0) return 0;
      var lineObj = getLine(line), text = lineObj.text;
      function getX(len) {
        return measureLine(lineObj, len).left;
      }
      var from = 0, fromX = 0, to = text.length, toX;
      // Guess a suitable upper bound for our search.
      var estimated = Math.min(to, Math.ceil(x / charWidth()));
      for (;;) {
        var estX = getX(estimated);
        if (estX <= x && estimated < to) estimated = Math.min(to, Math.ceil(estimated * 1.2));
        else {toX = estX; to = estimated; break;}
      }
      if (x > toX) return to;
      // Try to guess a suitable lower bound as well.
      estimated = Math.floor(to * 0.8); estX = getX(estimated);
      if (estX < x) {from = estimated; fromX = estX;}
      // Do a binary search between these bounds.
      for (;;) {
        if (to - from <= 1) return (toX - x > x - fromX) ? from : to;
        var middle = Math.ceil((from + to) / 2), middleX = getX(middle);
        if (middleX > x) {to = middle; toX = middleX;}
        else {from = middle; fromX = middleX;}
      }
    }

    function measureLine(line, ch) {
      if (ch == 0) return {top: 0, left: 0};
      var wbr = options.lineWrapping && ch < line.text.length &&
                spanAffectsWrapping.test(line.text.slice(ch - 1, ch + 1));
      var pre = line.getElement(makeTab, ch, wbr);
      removeChildrenAndAdd(measure, pre);
      var anchor = pre.anchor;
      var top = anchor.offsetTop, left = anchor.offsetLeft;
      // Older IEs report zero offsets for spans directly after a wrap
      if (ie && top == 0 && left == 0) {
        var backup = elt("span", "x");
        anchor.parentNode.insertBefore(backup, anchor.nextSibling);
        top = backup.offsetTop;
      }
      return {top: top, left: left};
    }
    function localCoords(pos, inLineWrap) {
      var x, lh = textHeight(), y = lh * (heightAtLine(doc, pos.line) - (inLineWrap ? displayOffset : 0));
      if (pos.ch == 0) x = 0;
      else {
        var sp = measureLine(getLine(pos.line), pos.ch);
        x = sp.left;
        if (options.lineWrapping) y += Math.max(0, sp.top);
      }
      return {x: x, y: y, yBot: y + lh};
    }
    // Coords must be lineSpace-local
    function coordsChar(x, y) {
      var th = textHeight(), cw = charWidth(), heightPos = displayOffset + Math.floor(y / th);
      if (heightPos < 0) return {line: 0, ch: 0};
      var lineNo = lineAtHeight(doc, heightPos);
      if (lineNo >= doc.size) return {line: doc.size - 1, ch: getLine(doc.size - 1).text.length};
      var lineObj = getLine(lineNo), text = lineObj.text;
      var tw = options.lineWrapping, innerOff = tw ? heightPos - heightAtLine(doc, lineNo) : 0;
      if (x <= 0 && innerOff == 0) return {line: lineNo, ch: 0};
      var wrongLine = false;
      function getX(len) {
        var sp = measureLine(lineObj, len);
        if (tw) {
          var off = Math.round(sp.top / th);
          wrongLine = off != innerOff;
          return Math.max(0, sp.left + (off - innerOff) * scroller.clientWidth);
        }
        return sp.left;
      }
      var from = 0, fromX = 0, to = text.length, toX;
      // Guess a suitable upper bound for our search.
      var estimated = Math.min(to, Math.ceil((x + innerOff * scroller.clientWidth * .9) / cw));
      for (;;) {
        var estX = getX(estimated);
        if (estX <= x && estimated < to) estimated = Math.min(to, Math.ceil(estimated * 1.2));
        else {toX = estX; to = estimated; break;}
      }
      if (x > toX) return {line: lineNo, ch: to};
      // Try to guess a suitable lower bound as well.
      estimated = Math.floor(to * 0.8); estX = getX(estimated);
      if (estX < x) {from = estimated; fromX = estX;}
      // Do a binary search between these bounds.
      for (;;) {
        if (to - from <= 1) {
          var after = x - fromX < toX - x;
          return {line: lineNo, ch: after ? from : to, after: after};
        }
        var middle = Math.ceil((from + to) / 2), middleX = getX(middle);
        if (middleX > x) {to = middle; toX = middleX; if (wrongLine) toX += 1000; }
        else {from = middle; fromX = middleX;}
      }
    }
    function pageCoords(pos) {
      var local = localCoords(pos, true), off = eltOffset(lineSpace);
      return {x: off.left + local.x, y: off.top + local.y, yBot: off.top + local.yBot};
    }

    var cachedHeight, cachedHeightFor, measurePre;
    function textHeight() {
      if (measurePre == null) {
        measurePre = elt("pre");
        for (var i = 0; i < 49; ++i) {
          measurePre.appendChild(document.createTextNode("x"));
          measurePre.appendChild(elt("br"));
        }
        measurePre.appendChild(document.createTextNode("x"));
      }
      var offsetHeight = lineDiv.clientHeight;
      if (offsetHeight == cachedHeightFor) return cachedHeight;
      cachedHeightFor = offsetHeight;
      removeChildrenAndAdd(measure, measurePre.cloneNode(true));
      cachedHeight = measure.firstChild.offsetHeight / 50 || 1;
      removeChildren(measure);
      return cachedHeight;
    }
    var cachedWidth, cachedWidthFor = 0;
    function charWidth() {
      if (scroller.clientWidth == cachedWidthFor) return cachedWidth;
      cachedWidthFor = scroller.clientWidth;
      var anchor = elt("span", "x");
      var pre = elt("pre", [anchor]);
      removeChildrenAndAdd(measure, pre);
      return (cachedWidth = anchor.offsetWidth || 10);
    }
    function paddingTop() {return lineSpace.offsetTop;}
    function paddingLeft() {return lineSpace.offsetLeft;}

    function posFromMouse(e, liberal) {
      var offW = eltOffset(scroller, true), x, y;
      // Fails unpredictably on IE[67] when mouse is dragged around quickly.
      try { x = e.clientX; y = e.clientY; } catch (e) { return null; }
      // This is a mess of a heuristic to try and determine whether a
      // scroll-bar was clicked or not, and to return null if one was
      // (and !liberal).
      if (!liberal && (x - offW.left > scroller.clientWidth || y - offW.top > scroller.clientHeight))
        return null;
      var offL = eltOffset(lineSpace, true);
      return coordsChar(x - offL.left, y - offL.top);
    }
    function onContextMenu(e) {
      var pos = posFromMouse(e), scrollPos = scrollbar.scrollTop;
      if (!pos || opera) return; // Opera is difficult.
      if (posEq(sel.from, sel.to) || posLess(pos, sel.from) || !posLess(pos, sel.to))
        operation(setCursor)(pos.line, pos.ch);

      var oldCSS = input.style.cssText;
      inputDiv.style.position = "absolute";
      input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) +
        "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " +
        "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      leaveInputAlone = true;
      var val = input.value = getSelection();
      focusInput();
      selectInput(input);
      function rehide() {
        var newVal = splitLines(input.value).join("\n");
        if (newVal != val && !options.readOnly) operation(replaceSelection)(newVal, "end");
        inputDiv.style.position = "relative";
        input.style.cssText = oldCSS;
        if (ie_lt9) scrollbar.scrollTop = scrollPos;
        leaveInputAlone = false;
        resetInput(true);
        slowPoll();
      }

      if (gecko) {
        e_stop(e);
        var mouseup = connect(window, "mouseup", function() {
          mouseup();
          setTimeout(rehide, 20);
        }, true);
      } else {
        setTimeout(rehide, 50);
      }
    }

    // Cursor-blinking
    function restartBlink() {
      clearInterval(blinker);
      var on = true;
      cursor.style.visibility = "";
      blinker = setInterval(function() {
        cursor.style.visibility = (on = !on) ? "" : "hidden";
      }, 650);
    }

    var matching = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<"};
    function matchBrackets(autoclear) {
      var head = sel.inverted ? sel.from : sel.to, line = getLine(head.line), pos = head.ch - 1;
      var match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)];
      if (!match) return;
      var ch = match.charAt(0), forward = match.charAt(1) == ">", d = forward ? 1 : -1, st = line.styles;
      for (var off = pos + 1, i = 0, e = st.length; i < e; i+=2)
        if ((off -= st[i].length) <= 0) {var style = st[i+1]; break;}

      var stack = [line.text.charAt(pos)], re = /[(){}[\]]/;
      function scan(line, from, to) {
        if (!line.text) return;
        var st = line.styles, pos = forward ? 0 : line.text.length - 1, cur;
        for (var i = forward ? 0 : st.length - 2, e = forward ? st.length : -2; i != e; i += 2*d) {
          var text = st[i];
          if (st[i+1] != style) {pos += d * text.length; continue;}
          for (var j = forward ? 0 : text.length - 1, te = forward ? text.length : -1; j != te; j += d, pos+=d) {
            if (pos >= from && pos < to && re.test(cur = text.charAt(j))) {
              var match = matching[cur];
              if (match.charAt(1) == ">" == forward) stack.push(cur);
              else if (stack.pop() != match.charAt(0)) return {pos: pos, match: false};
              else if (!stack.length) return {pos: pos, match: true};
            }
          }
        }
      }
      for (var i = head.line, e = forward ? Math.min(i + 100, doc.size) : Math.max(-1, i - 100); i != e; i+=d) {
        var line = getLine(i), first = i == head.line;
        var found = scan(line, first && forward ? pos + 1 : 0, first && !forward ? pos : line.text.length);
        if (found) break;
      }
      if (!found) found = {pos: null, match: false};
      var style = found.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
      var one = markText({line: head.line, ch: pos}, {line: head.line, ch: pos+1}, style),
          two = found.pos != null && markText({line: i, ch: found.pos}, {line: i, ch: found.pos + 1}, style);
      var clear = operation(function(){one.clear(); two && two.clear();});
      if (autoclear) setTimeout(clear, 800);
      else bracketHighlighted = clear;
    }

    // Finds the line to start with when starting a parse. Tries to
    // find a line with a stateAfter, so that it can start with a
    // valid state. If that fails, it returns the line with the
    // smallest indentation, which tends to need the least context to
    // parse correctly.
    function findStartLine(n) {
      var minindent, minline;
      for (var search = n, lim = n - 40; search > lim; --search) {
        if (search == 0) return 0;
        var line = getLine(search-1);
        if (line.stateAfter) return search;
        var indented = line.indentation(options.tabSize);
        if (minline == null || minindent > indented) {
          minline = search - 1;
          minindent = indented;
        }
      }
      return minline;
    }
    function getStateBefore(n) {
      var start = findStartLine(n), state = start && getLine(start-1).stateAfter;
      if (!state) state = startState(mode);
      else state = copyState(mode, state);
      doc.iter(start, n, function(line) {
        line.highlight(mode, state, options.tabSize);
        line.stateAfter = copyState(mode, state);
      });
      if (start < n) changes.push({from: start, to: n});
      if (n < doc.size && !getLine(n).stateAfter) work.push(n);
      return state;
    }
    function highlightLines(start, end) {
      var state = getStateBefore(start);
      doc.iter(start, end, function(line) {
        line.highlight(mode, state, options.tabSize);
        line.stateAfter = copyState(mode, state);
      });
    }
    function highlightWorker() {
      var end = +new Date + options.workTime;
      var foundWork = work.length;
      while (work.length) {
        if (!getLine(showingFrom).stateAfter) var task = showingFrom;
        else var task = work.pop();
        if (task >= doc.size) continue;
        var start = findStartLine(task), state = start && getLine(start-1).stateAfter;
        if (state) state = copyState(mode, state);
        else state = startState(mode);

        var unchanged = 0, compare = mode.compareStates, realChange = false,
            i = start, bail = false;
        doc.iter(i, doc.size, function(line) {
          var hadState = line.stateAfter;
          if (+new Date > end) {
            work.push(i);
            startWorker(options.workDelay);
            if (realChange) changes.push({from: task, to: i + 1});
            return (bail = true);
          }
          var changed = line.highlight(mode, state, options.tabSize);
          if (changed) realChange = true;
          line.stateAfter = copyState(mode, state);
          var done = null;
          if (compare) {
            var same = hadState && compare(hadState, state);
            if (same != Pass) done = !!same;
          }
          if (done == null) {
            if (changed !== false || !hadState) unchanged = 0;
            else if (++unchanged > 3 && (!mode.indent || mode.indent(hadState, "") == mode.indent(state, "")))
              done = true;
          }
          if (done) return true;
          ++i;
        });
        if (bail) return;
        if (realChange) changes.push({from: task, to: i + 1});
      }
      if (foundWork && options.onHighlightComplete)
        options.onHighlightComplete(instance);
    }
    function startWorker(time) {
      if (!work.length) return;
      highlight.set(time, operation(highlightWorker));
    }

    // Operations are used to wrap changes in such a way that each
    // change won't have to update the cursor and display (which would
    // be awkward, slow, and error-prone), but instead updates are
    // batched and then all combined and executed at once.
    function startOperation() {
      updateInput = userSelChange = textChanged = null;
      changes = []; selectionChanged = false; callbacks = [];
    }
    function endOperation() {
      if (updateMaxLine) computeMaxLength();
      if (maxLineChanged && !options.lineWrapping) {
        var cursorWidth = widthForcer.offsetWidth, left = measureLine(maxLine, maxLine.text.length).left;
        widthForcer.style.left = left + "px";
        lineSpace.style.minWidth = (left + cursorWidth) + "px";
        maxLineChanged = false;
      }
      var newScrollPos, updated;
      if (selectionChanged) {
        var coords = calculateCursorCoords();
        newScrollPos = calculateScrollPos(coords.x, coords.y, coords.x, coords.yBot);
      }
      if (changes.length || newScrollPos && newScrollPos.scrollTop != null)
        updated = updateDisplay(changes, true, newScrollPos && newScrollPos.scrollTop);
      if (!updated) {
        if (selectionChanged) updateSelection();
        if (gutterDirty) updateGutter();
      }
      if (newScrollPos) scrollCursorIntoView();
      if (selectionChanged) restartBlink();

      if (focused && !leaveInputAlone &&
          (updateInput === true || (updateInput !== false && selectionChanged)))
        resetInput(userSelChange);

      if (selectionChanged && options.matchBrackets)
        setTimeout(operation(function() {
          if (bracketHighlighted) {bracketHighlighted(); bracketHighlighted = null;}
          if (posEq(sel.from, sel.to)) matchBrackets(false);
        }), 20);
      var sc = selectionChanged, cbs = callbacks; // these can be reset by callbacks
      if (textChanged && options.onChange && instance)
        options.onChange(instance, textChanged);
      if (sc && options.onCursorActivity)
        options.onCursorActivity(instance);
      for (var i = 0; i < cbs.length; ++i) cbs[i](instance);
      if (updated && options.onUpdate) options.onUpdate(instance);
    }
    var nestedOperation = 0;
    function operation(f) {
      return function() {
        if (!nestedOperation++) startOperation();
        try {var result = f.apply(this, arguments);}
        finally {if (!--nestedOperation) endOperation();}
        return result;
      };
    }

    function compoundChange(f) {
      history.startCompound();
      try { return f(); } finally { history.endCompound(); }
    }

    for (var ext in extensions)
      if (extensions.propertyIsEnumerable(ext) &&
          !instance.propertyIsEnumerable(ext))
        instance[ext] = extensions[ext];
    return instance;
  } // (end of function CodeMirror)

  // The default configuration options.
  CodeMirror.defaults = {
    value: "",
    mode: null,
    theme: "default",
    indentUnit: 2,
    indentWithTabs: false,
    smartIndent: true,
    tabSize: 4,
    keyMap: "default",
    extraKeys: null,
    electricChars: true,
    autoClearEmptyLines: false,
    onKeyEvent: null,
    onDragEvent: null,
    lineWrapping: false,
    lineNumbers: false,
    gutter: false,
    fixedGutter: false,
    firstLineNumber: 1,
    readOnly: false,
    dragDrop: true,
    onChange: null,
    onCursorActivity: null,
    onViewportChange: null,
    onGutterClick: null,
    onHighlightComplete: null,
    onUpdate: null,
    onFocus: null, onBlur: null, onScroll: null,
    matchBrackets: false,
    workTime: 100,
    workDelay: 200,
    pollInterval: 100,
    undoDepth: 40,
    tabindex: null,
    autofocus: null,
    lineNumberFormatter: function(integer) { return integer; }
  };

  var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  var mac = ios || /Mac/.test(navigator.platform);
  var win = /Win/.test(navigator.platform);

  // Known modes, by name and by MIME
  var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
  CodeMirror.defineMode = function(name, mode) {
    if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
    if (arguments.length > 2) {
      mode.dependencies = [];
      for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
    }
    modes[name] = mode;
  };
  CodeMirror.defineMIME = function(mime, spec) {
    mimeModes[mime] = spec;
  };
  CodeMirror.resolveMode = function(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec))
      spec = mimeModes[spec];
    else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec))
      return CodeMirror.resolveMode("application/xml");
    if (typeof spec == "string") return {name: spec};
    else return spec || {name: "null"};
  };
  CodeMirror.getMode = function(options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) return CodeMirror.getMode(options, "text/plain");
    return mfactory(options, spec);
  };
  CodeMirror.listModes = function() {
    var list = [];
    for (var m in modes)
      if (modes.propertyIsEnumerable(m)) list.push(m);
    return list;
  };
  CodeMirror.listMIMEs = function() {
    var list = [];
    for (var m in mimeModes)
      if (mimeModes.propertyIsEnumerable(m)) list.push({mime: m, mode: mimeModes[m]});
    return list;
  };

  var extensions = CodeMirror.extensions = {};
  CodeMirror.defineExtension = function(name, func) {
    extensions[name] = func;
  };

  var commands = CodeMirror.commands = {
    selectAll: function(cm) {cm.setSelection({line: 0, ch: 0}, {line: cm.lineCount() - 1});},
    killLine: function(cm) {
      var from = cm.getCursor(true), to = cm.getCursor(false), sel = !posEq(from, to);
      if (!sel && cm.getLine(from.line).length == from.ch) cm.replaceRange("", from, {line: from.line + 1, ch: 0});
      else cm.replaceRange("", from, sel ? to : {line: from.line});
    },
    deleteLine: function(cm) {var l = cm.getCursor().line; cm.replaceRange("", {line: l, ch: 0}, {line: l});},
    undo: function(cm) {cm.undo();},
    redo: function(cm) {cm.redo();},
    goDocStart: function(cm) {cm.setCursor(0, 0, true);},
    goDocEnd: function(cm) {cm.setSelection({line: cm.lineCount() - 1}, null, true);},
    goLineStart: function(cm) {cm.setCursor(cm.getCursor().line, 0, true);},
    goLineStartSmart: function(cm) {
      var cur = cm.getCursor();
      var text = cm.getLine(cur.line), firstNonWS = Math.max(0, text.search(/\S/));
      cm.setCursor(cur.line, cur.ch <= firstNonWS && cur.ch ? 0 : firstNonWS, true);
    },
    goLineEnd: function(cm) {cm.setSelection({line: cm.getCursor().line}, null, true);},
    goLineUp: function(cm) {cm.moveV(-1, "line");},
    goLineDown: function(cm) {cm.moveV(1, "line");},
    goPageUp: function(cm) {cm.moveV(-1, "page");},
    goPageDown: function(cm) {cm.moveV(1, "page");},
    goCharLeft: function(cm) {cm.moveH(-1, "char");},
    goCharRight: function(cm) {cm.moveH(1, "char");},
    goColumnLeft: function(cm) {cm.moveH(-1, "column");},
    goColumnRight: function(cm) {cm.moveH(1, "column");},
    goWordLeft: function(cm) {cm.moveH(-1, "word");},
    goWordRight: function(cm) {cm.moveH(1, "word");},
    delCharLeft: function(cm) {cm.deleteH(-1, "char");},
    delCharRight: function(cm) {cm.deleteH(1, "char");},
    delWordLeft: function(cm) {cm.deleteH(-1, "word");},
    delWordRight: function(cm) {cm.deleteH(1, "word");},
    indentAuto: function(cm) {cm.indentSelection("smart");},
    indentMore: function(cm) {cm.indentSelection("add");},
    indentLess: function(cm) {cm.indentSelection("subtract");},
    insertTab: function(cm) {cm.replaceSelection("\t", "end");},
    defaultTab: function(cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.replaceSelection("\t", "end");
    },
    transposeChars: function(cm) {
      var cur = cm.getCursor(), line = cm.getLine(cur.line);
      if (cur.ch > 0 && cur.ch < line.length - 1)
        cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1),
                        {line: cur.line, ch: cur.ch - 1}, {line: cur.line, ch: cur.ch + 1});
    },
    newlineAndIndent: function(cm) {
      cm.replaceSelection("\n", "end");
      cm.indentLine(cm.getCursor().line);
    },
    toggleOverwrite: function(cm) {cm.toggleOverwrite();}
  };

  var keyMap = CodeMirror.keyMap = {};
  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharRight", "Backspace": "delCharLeft", "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite"
  };
  // Note that the save and find-related commands aren't defined by
  // default. Unknown commands are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Alt-Up": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Down": "goDocEnd",
    "Ctrl-Left": "goWordLeft", "Ctrl-Right": "goWordRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delWordLeft", "Ctrl-Delete": "delWordRight", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    fallthrough: "basic"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goWordLeft",
    "Alt-Right": "goWordRight", "Cmd-Left": "goLineStart", "Cmd-Right": "goLineEnd", "Alt-Backspace": "delWordLeft",
    "Ctrl-Alt-Backspace": "delWordRight", "Alt-Delete": "delWordRight", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageUp", "Shift-Ctrl-V": "goPageDown", "Ctrl-D": "delCharRight", "Ctrl-H": "delCharLeft",
    "Alt-D": "delWordRight", "Alt-Backspace": "delWordLeft", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"
  };

  function getKeyMap(val) {
    if (typeof val == "string") return keyMap[val];
    else return val;
  }
  function lookupKey(name, extraMap, map, handle, stop) {
    function lookup(map) {
      map = getKeyMap(map);
      var found = map[name];
      if (found === false) {
        if (stop) stop();
        return true;
      }
      if (found != null && handle(found)) return true;
      if (map.nofallthrough) {
        if (stop) stop();
        return true;
      }
      var fallthrough = map.fallthrough;
      if (fallthrough == null) return false;
      if (Object.prototype.toString.call(fallthrough) != "[object Array]")
        return lookup(fallthrough);
      for (var i = 0, e = fallthrough.length; i < e; ++i) {
        if (lookup(fallthrough[i])) return true;
      }
      return false;
    }
    if (extraMap && lookup(extraMap)) return true;
    return lookup(map);
  }
  function isModifierKey(event) {
    var name = keyNames[e_prop(event, "keyCode")];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  }

  CodeMirror.fromTextArea = function(textarea, options) {
    if (!options) options = {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabindex)
      options.tabindex = textarea.tabindex;
    if (options.autofocus == null)
      try { if (document.activeElement == textarea) options.autofocus = true; } catch(e) {}

    function save() {textarea.value = instance.getValue();}
    if (textarea.form) {
      // Deplorable hack to make the submit method do the right thing.
      var rmSubmit = connect(textarea.form, "submit", save, true);
      if (typeof textarea.form.submit == "function") {
        var realSubmit = textarea.form.submit;
        textarea.form.submit = function wrappedSubmit() {
          save();
          textarea.form.submit = realSubmit;
          textarea.form.submit();
          textarea.form.submit = wrappedSubmit;
        };
      }
    }

    textarea.style.display = "none";
    var instance = CodeMirror(function(node) {
      textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    instance.save = save;
    instance.getTextArea = function() { return textarea; };
    instance.toTextArea = function() {
      save();
      textarea.parentNode.removeChild(instance.getWrapperElement());
      textarea.style.display = "";
      if (textarea.form) {
        rmSubmit();
        if (typeof textarea.form.submit == "function")
          textarea.form.submit = realSubmit;
      }
    };
    return instance;
  };

  var gecko = /gecko\/\d{7}/i.test(navigator.userAgent);
  var ie = /MSIE \d/.test(navigator.userAgent);
  var ie_lt8 = /MSIE [1-7]\b/.test(navigator.userAgent);
  var ie_lt9 = /MSIE [1-8]\b/.test(navigator.userAgent);
  var quirksMode = ie && document.documentMode == 5;
  var webkit = /WebKit\//.test(navigator.userAgent);
  var chrome = /Chrome\//.test(navigator.userAgent);
  var opera = /Opera\//.test(navigator.userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var khtml = /KHTML\//.test(navigator.userAgent);
  var mac_geLion = /Mac OS X 10\D([7-9]|\d\d)\D/.test(navigator.userAgent);

  // Utility functions for working with state. Exported because modes
  // sometimes need to do this.
  function copyState(mode, state) {
    if (state === true) return state;
    if (mode.copyState) return mode.copyState(state);
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) val = val.concat([]);
      nstate[n] = val;
    }
    return nstate;
  }
  CodeMirror.copyState = copyState;
  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }
  CodeMirror.startState = startState;

  // The character stream used by a mode's parser.
  function StringStream(string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
  }
  StringStream.prototype = {
    eol: function() {return this.pos >= this.string.length;},
    sol: function() {return this.pos == 0;},
    peek: function() {return this.string.charAt(this.pos);},
    next: function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function(match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string") var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) {++this.pos; return ch;}
    },
    eatWhile: function(match) {
      var start = this.pos;
      while (this.eat(match)){}
      return this.pos > start;
    },
    eatSpace: function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    },
    skipToEnd: function() {this.pos = this.string.length;},
    skipTo: function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {this.pos = found; return true;}
    },
    backUp: function(n) {this.pos -= n;},
    column: function() {return countColumn(this.string, this.start, this.tabSize);},
    indentation: function() {return countColumn(this.string, null, this.tabSize);},
    match: function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {return caseInsensitive ? str.toLowerCase() : str;};
        if (cased(this.string).indexOf(cased(pattern), this.pos) == this.pos) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current: function(){return this.string.slice(this.start, this.pos);}
  };
  CodeMirror.StringStream = StringStream;

  function MarkedText(from, to, className, marker) {
    this.from = from; this.to = to; this.style = className; this.marker = marker;
  }
  MarkedText.prototype = {
    attach: function(line) { this.marker.set.push(line); },
    detach: function(line) {
      var ix = indexOf(this.marker.set, line);
      if (ix > -1) this.marker.set.splice(ix, 1);
    },
    split: function(pos, lenBefore) {
      if (this.to <= pos && this.to != null) return null;
      var from = this.from < pos || this.from == null ? null : this.from - pos + lenBefore;
      var to = this.to == null ? null : this.to - pos + lenBefore;
      return new MarkedText(from, to, this.style, this.marker);
    },
    dup: function() { return new MarkedText(null, null, this.style, this.marker); },
    clipTo: function(fromOpen, from, toOpen, to, diff) {
      if (fromOpen && to > this.from && (to < this.to || this.to == null))
        this.from = null;
      else if (this.from != null && this.from >= from)
        this.from = Math.max(to, this.from) + diff;
      if (toOpen && (from < this.to || this.to == null) && (from > this.from || this.from == null))
        this.to = null;
      else if (this.to != null && this.to > from)
        this.to = to < this.to ? this.to + diff : from;
    },
    isDead: function() { return this.from != null && this.to != null && this.from >= this.to; },
    sameSet: function(x) { return this.marker == x.marker; }
  };

  function Bookmark(pos) {
    this.from = pos; this.to = pos; this.line = null;
  }
  Bookmark.prototype = {
    attach: function(line) { this.line = line; },
    detach: function(line) { if (this.line == line) this.line = null; },
    split: function(pos, lenBefore) {
      if (pos < this.from) {
        this.from = this.to = (this.from - pos) + lenBefore;
        return this;
      }
    },
    isDead: function() { return this.from > this.to; },
    clipTo: function(fromOpen, from, toOpen, to, diff) {
      if ((fromOpen || from < this.from) && (toOpen || to > this.to)) {
        this.from = 0; this.to = -1;
      } else if (this.from > from) {
        this.from = this.to = Math.max(to, this.from) + diff;
      }
    },
    sameSet: function(x) { return false; },
    find: function() {
      if (!this.line || !this.line.parent) return null;
      return {line: lineNo(this.line), ch: this.from};
    },
    clear: function() {
      if (this.line) {
        var found = indexOf(this.line.marked, this);
        if (found != -1) this.line.marked.splice(found, 1);
        this.line = null;
      }
    }
  };

  // When measuring the position of the end of a line, different
  // browsers require different approaches. If an empty span is added,
  // many browsers report bogus offsets. Of those, some (Webkit,
  // recent IE) will accept a space without moving the whole span to
  // the next line when wrapping it, others work with a zero-width
  // space.
  var eolSpanContent = " ";
  if (gecko || (ie && !ie_lt8)) eolSpanContent = "\u200b";
  else if (opera) eolSpanContent = "";

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  function Line(text, styles) {
    this.styles = styles || [text, null];
    this.text = text;
    this.height = 1;
  }
  Line.inheritMarks = function(text, orig) {
    var ln = new Line(text), mk = orig && orig.marked;
    if (mk) {
      for (var i = 0; i < mk.length; ++i) {
        if (mk[i].to == null && mk[i].style) {
          var newmk = ln.marked || (ln.marked = []), mark = mk[i];
          var nmark = mark.dup(); newmk.push(nmark); nmark.attach(ln);
        }
      }
    }
    return ln;
  };
  Line.prototype = {
    // Replace a piece of a line, keeping the styles around it intact.
    replace: function(from, to_, text) {
      var st = [], mk = this.marked, to = to_ == null ? this.text.length : to_;
      copyStyles(0, from, this.styles, st);
      if (text) st.push(text, null);
      copyStyles(to, this.text.length, this.styles, st);
      this.styles = st;
      this.text = this.text.slice(0, from) + text + this.text.slice(to);
      this.stateAfter = null;
      if (mk) {
        var diff = text.length - (to - from);
        for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          mark.clipTo(from == null, from || 0, to_ == null, to, diff);
          if (mark.isDead()) {mark.detach(this); mk.splice(i--, 1);}
        }
      }
    },
    // Split a part off a line, keeping styles and markers intact.
    split: function(pos, textBefore) {
      var st = [textBefore, null], mk = this.marked;
      copyStyles(pos, this.text.length, this.styles, st);
      var taken = new Line(textBefore + this.text.slice(pos), st);
      if (mk) {
        for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          var newmark = mark.split(pos, textBefore.length);
          if (newmark) {
            if (!taken.marked) taken.marked = [];
            taken.marked.push(newmark); newmark.attach(taken);
            if (newmark == mark) mk.splice(i--, 1);
          }
        }
      }
      return taken;
    },
    append: function(line) {
      var mylen = this.text.length, mk = line.marked, mymk = this.marked;
      this.text += line.text;
      copyStyles(0, line.text.length, line.styles, this.styles);
      if (mymk) {
        for (var i = 0; i < mymk.length; ++i)
          if (mymk[i].to == null) mymk[i].to = mylen;
      }
      if (mk && mk.length) {
        if (!mymk) this.marked = mymk = [];
        outer: for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          if (!mark.from) {
            for (var j = 0; j < mymk.length; ++j) {
              var mymark = mymk[j];
              if (mymark.to == mylen && mymark.sameSet(mark)) {
                mymark.to = mark.to == null ? null : mark.to + mylen;
                if (mymark.isDead()) {
                  mymark.detach(this);
                  mk.splice(i--, 1);
                }
                continue outer;
              }
            }
          }
          mymk.push(mark);
          mark.attach(this);
          mark.from += mylen;
          if (mark.to != null) mark.to += mylen;
        }
      }
    },
    fixMarkEnds: function(other) {
      var mk = this.marked, omk = other.marked;
      if (!mk) return;
      outer: for (var i = 0; i < mk.length; ++i) {
        var mark = mk[i], close = mark.to == null;
        if (close && omk) {
          for (var j = 0; j < omk.length; ++j) {
            var om = omk[j];
            if (!om.sameSet(mark) || om.from != null) continue;
            if (mark.from == this.text.length && om.to == 0) {
              omk.splice(j, 1);
              mk.splice(i--, 1);
              continue outer;
            } else {
              close = false; break;
            }
          }
        }
        if (close) mark.to = this.text.length;
      }
    },
    fixMarkStarts: function() {
      var mk = this.marked;
      if (!mk) return;
      for (var i = 0; i < mk.length; ++i)
        if (mk[i].from == null) mk[i].from = 0;
    },
    addMark: function(mark) {
      mark.attach(this);
      if (this.marked == null) this.marked = [];
      this.marked.push(mark);
      this.marked.sort(function(a, b){return (a.from || 0) - (b.from || 0);});
    },
    // Run the given mode's parser over a line, update the styles
    // array, which contains alternating fragments of text and CSS
    // classes.
    highlight: function(mode, state, tabSize) {
      var stream = new StringStream(this.text, tabSize), st = this.styles, pos = 0;
      var changed = false, curWord = st[0], prevWord;
      if (this.text == "" && mode.blankLine) mode.blankLine(state);
      while (!stream.eol()) {
        var style = mode.token(stream, state);
        var substr = this.text.slice(stream.start, stream.pos);
        stream.start = stream.pos;
        if (pos && st[pos-1] == style)
          st[pos-2] += substr;
        else if (substr) {
          if (!changed && (st[pos+1] != style || (pos && st[pos-2] != prevWord))) changed = true;
          st[pos++] = substr; st[pos++] = style;
          prevWord = curWord; curWord = st[pos];
        }
        // Give up when line is ridiculously long
        if (stream.pos > 5000) {
          st[pos++] = this.text.slice(stream.pos); st[pos++] = null;
          break;
        }
      }
      if (st.length != pos) {st.length = pos; changed = true;}
      if (pos && st[pos-2] != prevWord) changed = true;
      // Short lines with simple highlights return null, and are
      // counted as changed by the driver because they are likely to
      // highlight the same way in various contexts.
      return changed || (st.length < 5 && this.text.length < 10 ? null : false);
    },
    // Fetch the parser token for a given character. Useful for hacks
    // that want to inspect the mode state (say, for completion).
    getTokenAt: function(mode, state, tabSize, ch) {
      var txt = this.text, stream = new StringStream(txt, tabSize);
      while (stream.pos < ch && !stream.eol()) {
        stream.start = stream.pos;
        var style = mode.token(stream, state);
      }
      return {start: stream.start,
              end: stream.pos,
              string: stream.current(),
              className: style || null,
              state: state};
    },
    indentation: function(tabSize) {return countColumn(this.text, null, tabSize);},
    // Produces an HTML fragment for the line, taking selection,
    // marking, and highlighting into account.
    getElement: function(makeTab, wrapAt, wrapWBR) {
      var first = true, col = 0, specials = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g;
      var pre = elt("pre");
      function span_(html, text, style) {
        if (!text) return;
        // Work around a bug where, in some compat modes, IE ignores leading spaces
        if (first && ie && text.charAt(0) == " ") text = "\u00a0" + text.slice(1);
        first = false;
        if (!specials.test(text)) {
          col += text.length;
          var content = document.createTextNode(text);
        } else {
          var content = document.createDocumentFragment(), pos = 0;
          while (true) {
            specials.lastIndex = pos;
            var m = specials.exec(text);
            var skipped = m ? m.index - pos : text.length - pos;
            if (skipped) {
              content.appendChild(document.createTextNode(text.slice(pos, pos + skipped)));
              col += skipped;
            }
            if (!m) break;
            pos += skipped + 1;
            if (m[0] == "\t") {
              var tab = makeTab(col);
              content.appendChild(tab.element.cloneNode(true));
              col += tab.width;
            } else {
              var token = elt("span", "\u2022", "cm-invalidchar");
              token.title = "\\u" + m[0].charCodeAt(0).toString(16);
              content.appendChild(token);
              col += 1;
            }
          }
        }
        if (style) html.appendChild(elt("span", [content], style));
        else html.appendChild(content);
      }
      var span = span_;
      if (wrapAt != null) {
        var outPos = 0, anchor = pre.anchor = elt("span");
        span = function(html, text, style) {
          var l = text.length;
          if (wrapAt >= outPos && wrapAt < outPos + l) {
            if (wrapAt > outPos) {
              span_(html, text.slice(0, wrapAt - outPos), style);
              // See comment at the definition of spanAffectsWrapping
              if (wrapWBR) html.appendChild(elt("wbr"));
            }
            html.appendChild(anchor);
            var cut = wrapAt - outPos;
            span_(anchor, opera ? text.slice(cut, cut + 1) : text.slice(cut), style);
            if (opera) span_(html, text.slice(cut + 1), style);
            wrapAt--;
            outPos += l;
          } else {
            outPos += l;
            span_(html, text, style);
            if (outPos == wrapAt && outPos == len) {
              setTextContent(anchor, eolSpanContent);
              html.appendChild(anchor);
            }
            // Stop outputting HTML when gone sufficiently far beyond measure
            else if (outPos > wrapAt + 10 && /\s/.test(text)) span = function(){};
          }
        };
      }

      var st = this.styles, allText = this.text, marked = this.marked;
      var len = allText.length;
      function styleToClass(style) {
        if (!style) return null;
        return "cm-" + style.replace(/ +/g, " cm-");
      }
      if (!allText && wrapAt == null) {
        span(pre, " ");
      } else if (!marked || !marked.length) {
        for (var i = 0, ch = 0; ch < len; i+=2) {
          var str = st[i], style = st[i+1], l = str.length;
          if (ch + l > len) str = str.slice(0, len - ch);
          ch += l;
          span(pre, str, styleToClass(style));
        }
      } else {
        var pos = 0, i = 0, text = "", style, sg = 0;
        var nextChange = marked[0].from || 0, marks = [], markpos = 0;
        var advanceMarks = function() {
          var m;
          while (markpos < marked.length &&
                 ((m = marked[markpos]).from == pos || m.from == null)) {
            if (m.style != null) marks.push(m);
            ++markpos;
          }
          nextChange = markpos < marked.length ? marked[markpos].from : Infinity;
          for (var i = 0; i < marks.length; ++i) {
            var to = marks[i].to;
            if (to == null) to = Infinity;
            if (to == pos) marks.splice(i--, 1);
            else nextChange = Math.min(to, nextChange);
          }
        };
        var m = 0;
        while (pos < len) {
          if (nextChange == pos) advanceMarks();
          var upto = Math.min(len, nextChange);
          while (true) {
            if (text) {
              var end = pos + text.length;
              var appliedStyle = style;
              for (var j = 0; j < marks.length; ++j)
                appliedStyle = (appliedStyle ? appliedStyle + " " : "") + marks[j].style;
              span(pre, end > upto ? text.slice(0, upto - pos) : text, appliedStyle);
              if (end >= upto) {text = text.slice(upto - pos); pos = upto; break;}
              pos = end;
            }
            text = st[i++]; style = styleToClass(st[i++]);
          }
        }
      }
      return pre;
    },
    cleanUp: function() {
      this.parent = null;
      if (this.marked)
        for (var i = 0, e = this.marked.length; i < e; ++i) this.marked[i].detach(this);
    }
  };
  // Utility used by replace and split above
  function copyStyles(from, to, source, dest) {
    for (var i = 0, pos = 0, state = 0; pos < to; i+=2) {
      var part = source[i], end = pos + part.length;
      if (state == 0) {
        if (end > from) dest.push(part.slice(from - pos, Math.min(part.length, to - pos)), source[i+1]);
        if (end >= from) state = 1;
      } else if (state == 1) {
        if (end > to) dest.push(part.slice(0, to - pos), source[i+1]);
        else dest.push(part, source[i+1]);
      }
      pos = end;
    }
  }

  // Data structure that holds the sequence of lines.
  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    for (var i = 0, e = lines.length, height = 0; i < e; ++i) {
      lines[i].parent = this;
      height += lines[i].height;
    }
    this.height = height;
  }
  LeafChunk.prototype = {
    chunkSize: function() { return this.lines.length; },
    remove: function(at, n, callbacks) {
      for (var i = at, e = at + n; i < e; ++i) {
        var line = this.lines[i];
        this.height -= line.height;
        line.cleanUp();
        if (line.handlers)
          for (var j = 0; j < line.handlers.length; ++j) callbacks.push(line.handlers[j]);
      }
      this.lines.splice(at, n);
    },
    collapse: function(lines) {
      lines.splice.apply(lines, [lines.length, 0].concat(this.lines));
    },
    insertHeight: function(at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0, e = lines.length; i < e; ++i) lines[i].parent = this;
    },
    iterN: function(at, n, op) {
      for (var e = at + n; at < e; ++at)
        if (op(this.lines[at])) return true;
    }
  };
  function BranchChunk(children) {
    this.children = children;
    var size = 0, height = 0;
    for (var i = 0, e = children.length; i < e; ++i) {
      var ch = children[i];
      size += ch.chunkSize(); height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }
  BranchChunk.prototype = {
    chunkSize: function() { return this.size; },
    remove: function(at, n, callbacks) {
      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.remove(at, rm, callbacks);
          this.height -= oldHeight - child.height;
          if (sz == rm) { this.children.splice(i--, 1); child.parent = null; }
          if ((n -= rm) == 0) break;
          at = 0;
        } else at -= sz;
      }
      if (this.size - n < 25) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function(lines) {
      for (var i = 0, e = this.children.length; i < e; ++i) this.children[i].collapse(lines);
    },
    insert: function(at, lines) {
      var height = 0;
      for (var i = 0, e = lines.length; i < e; ++i) height += lines[i].height;
      this.insertHeight(at, lines, height);
    },
    insertHeight: function(at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i = 0, e = this.children.length; i < e; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at <= sz) {
          child.insertHeight(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            while (child.lines.length > 50) {
              var spilled = child.lines.splice(child.lines.length - 25, 25);
              var newleaf = new LeafChunk(spilled);
              child.height -= newleaf.height;
              this.children.splice(i + 1, 0, newleaf);
              newleaf.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    maybeSpill: function() {
      if (this.children.length <= 10) return;
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) { // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iter: function(from, to, op) { this.iterN(from, to - from, op); },
    iterN: function(at, n, op) {
      for (var i = 0, e = this.children.length; i < e; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) return true;
          if ((n -= used) == 0) break;
          at = 0;
        } else at -= sz;
      }
    }
  };

  function getLineAt(chunk, n) {
    while (!chunk.lines) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; break; }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }
  function lineNo(line) {
    if (line.parent == null) return null;
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0, e = chunk.children.length; ; ++i) {
        if (chunk.children[i] == cur) break;
        no += chunk.children[i].chunkSize();
      }
    }
    return no;
  }
  function lineAtHeight(chunk, h) {
    var n = 0;
    outer: do {
      for (var i = 0, e = chunk.children.length; i < e; ++i) {
        var child = chunk.children[i], ch = child.height;
        if (h < ch) { chunk = child; continue outer; }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    for (var i = 0, e = chunk.lines.length; i < e; ++i) {
      var line = chunk.lines[i], lh = line.height;
      if (h < lh) break;
      h -= lh;
    }
    return n + i;
  }
  function heightAtLine(chunk, n) {
    var h = 0;
    outer: do {
      for (var i = 0, e = chunk.children.length; i < e; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; continue outer; }
        n -= sz;
        h += child.height;
      }
      return h;
    } while (!chunk.lines);
    for (var i = 0; i < n; ++i) h += chunk.lines[i].height;
    return h;
  }

  // The history object 'chunks' changes that are made close together
  // and at almost the same time into bigger undoable units.
  function History() {
    this.time = 0;
    this.done = []; this.undone = [];
    this.compound = 0;
    this.closed = false;
  }
  History.prototype = {
    addChange: function(start, added, old) {
      this.undone.length = 0;
      var time = +new Date, cur = this.done[this.done.length - 1], last = cur && cur[cur.length - 1];
      var dtime = time - this.time;

      if (this.compound && cur && !this.closed) {
        cur.push({start: start, added: added, old: old});
      } else if (dtime > 400 || !last || this.closed ||
                 last.start > start + old.length || last.start + last.added < start) {
        this.done.push([{start: start, added: added, old: old}]);
        this.closed = false;
      } else {
        var startBefore = Math.max(0, last.start - start),
            endAfter = Math.max(0, (start + old.length) - (last.start + last.added));
        for (var i = startBefore; i > 0; --i) last.old.unshift(old[i - 1]);
        for (var i = endAfter; i > 0; --i) last.old.push(old[old.length - i]);
        if (startBefore) last.start = start;
        last.added += added - (old.length - startBefore - endAfter);
      }
      this.time = time;
    },
    startCompound: function() {
      if (!this.compound++) this.closed = true;
    },
    endCompound: function() {
      if (!--this.compound) this.closed = true;
    }
  };

  function stopMethod() {e_stop(this);}
  // Ensure an event has a stop method.
  function addStop(event) {
    if (!event.stop) event.stop = stopMethod;
    return event;
  }

  function e_preventDefault(e) {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
  function e_stop(e) {e_preventDefault(e); e_stopPropagation(e);}
  CodeMirror.e_stop = e_stop;
  CodeMirror.e_preventDefault = e_preventDefault;
  CodeMirror.e_stopPropagation = e_stopPropagation;

  function e_target(e) {return e.target || e.srcElement;}
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) b = 1;
      else if (e.button & 2) b = 3;
      else if (e.button & 4) b = 2;
    }
    if (mac && e.ctrlKey && b == 1) b = 3;
    return b;
  }

  // Allow 3rd-party code to override event properties by adding an override
  // object to an event object.
  function e_prop(e, prop) {
    var overridden = e.override && e.override.hasOwnProperty(prop);
    return overridden ? e.override[prop] : e[prop];
  }

  // Event handler registration. If disconnect is true, it'll return a
  // function that unregisters the handler.
  function connect(node, type, handler, disconnect) {
    if (typeof node.addEventListener == "function") {
      node.addEventListener(type, handler, false);
      if (disconnect) return function() {node.removeEventListener(type, handler, false);};
    } else {
      var wrapHandler = function(event) {handler(event || window.event);};
      node.attachEvent("on" + type, wrapHandler);
      if (disconnect) return function() {node.detachEvent("on" + type, wrapHandler);};
    }
  }
  CodeMirror.connect = connect;

  function Delayed() {this.id = null;}
  Delayed.prototype = {set: function(ms, f) {clearTimeout(this.id); this.id = setTimeout(f, ms);}};

  var Pass = CodeMirror.Pass = {toString: function(){return "CodeMirror.Pass";}};

  // Detect drag-and-drop
  var dragAndDrop = function() {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie_lt9) return false;
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  // Feature-detect whether newlines in textareas are converted to \r\n
  var lineSep = function () {
    var te = elt("textarea");
    te.value = "foo\nbar";
    if (te.value.indexOf("\r") > -1) return "\r\n";
    return "\n";
  }();

  // For a reason I have yet to figure out, some browsers disallow
  // word wrapping between certain characters *only* if a new inline
  // element is started between them. This makes it hard to reliably
  // measure the position of things, since that requires inserting an
  // extra span. This terribly fragile set of regexps matches the
  // character combinations that suffer from this phenomenon on the
  // various browsers.
  var spanAffectsWrapping = /^$/; // Won't match any two-character string
  if (gecko) spanAffectsWrapping = /$'/;
  else if (safari) spanAffectsWrapping = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/;
  else if (chrome) spanAffectsWrapping = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/;

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  function countColumn(string, end, tabSize) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) end = string.length;
    }
    for (var i = 0, n = 0; i < end; ++i) {
      if (string.charAt(i) == "\t") n += tabSize - (n % tabSize);
      else ++n;
    }
    return n;
  }

  function computedStyle(elt) {
    if (elt.currentStyle) return elt.currentStyle;
    return window.getComputedStyle(elt, null);
  }

  function eltOffset(node, screen) {
    // Take the parts of bounding client rect that we are interested in so we are able to edit if need be,
    // since the returned value cannot be changed externally (they are kept in sync as the element moves within the page)
    try { var box = node.getBoundingClientRect(); box = { top: box.top, left: box.left }; }
    catch(e) { box = {top: 0, left: 0}; }
    if (!screen) {
      // Get the toplevel scroll, working around browser differences.
      if (window.pageYOffset == null) {
        var t = document.documentElement || document.body.parentNode;
        if (t.scrollTop == null) t = document.body;
        box.top += t.scrollTop; box.left += t.scrollLeft;
      } else {
        box.top += window.pageYOffset; box.left += window.pageXOffset;
      }
    }
    return box;
  }

  // Get a node's text content.
  function eltText(node) {
    return node.textContent || node.innerText || node.nodeValue || "";
  }
  function selectInput(node) {
    if (ios) { // Mobile Safari apparently has a bug where select() is broken.
      node.selectionStart = 0;
      node.selectionEnd = node.value.length;
    } else node.select();
  }

  // Operations on {line, ch} objects.
  function posEq(a, b) {return a.line == b.line && a.ch == b.ch;}
  function posLess(a, b) {return a.line < b.line || (a.line == b.line && a.ch < b.ch);}
  function copyPos(x) {return {line: x.line, ch: x.ch};}

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (style) e.style.cssText = style;
    if (typeof content == "string") setTextContent(e, content);
    else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
    return e;
  }
  function removeChildren(e) {
    e.innerHTML = "";
    return e;
  }
  function removeChildrenAndAdd(parent, e) {
    removeChildren(parent).appendChild(e);
  }
  function setTextContent(e, str) {
    if (ie_lt9) {
      e.innerHTML = "";
      e.appendChild(document.createTextNode(str));
    } else e.textContent = str;
  }
  CodeMirror.setTextContent = setTextContent;

  // Used to position the cursor after an undo/redo by finding the
  // last edited character.
  function editEnd(from, to) {
    if (!to) return 0;
    if (!from) return to.length;
    for (var i = from.length, j = to.length; i >= 0 && j >= 0; --i, --j)
      if (from.charAt(i) != to.charAt(j)) break;
    return j + 1;
  }

  function indexOf(collection, elt) {
    if (collection.indexOf) return collection.indexOf(elt);
    for (var i = 0, e = collection.length; i < e; ++i)
      if (collection[i] == elt) return i;
    return -1;
  }
  function isWordChar(ch) {
    return /\w/.test(ch) || ch.toUpperCase() != ch.toLowerCase();
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
    var pos = 0, result = [], l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) nl = string.length;
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function(string){return string.split(/\r\n?|\n/);};
  CodeMirror.splitLines = splitLines;

  var hasSelection = window.getSelection ? function(te) {
    try { return te.selectionStart != te.selectionEnd; }
    catch(e) { return false; }
  } : function(te) {
    try {var range = te.ownerDocument.selection.createRange();}
    catch(e) {}
    if (!range || range.parentElement() != te) return false;
    return range.compareEndPoints("StartToEnd", range) != 0;
  };

  CodeMirror.defineMode("null", function() {
    return {token: function(stream) {stream.skipToEnd();}};
  });
  CodeMirror.defineMIME("text/plain", "null");

  var keyNames = {3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
                  19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
                  36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
                  46: "Delete", 59: ";", 91: "Mod", 92: "Mod", 93: "Mod", 109: "-", 107: "=", 127: "Delete",
                  186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
                  221: "]", 222: "'", 63276: "PageUp", 63277: "PageDown", 63275: "End", 63273: "Home",
                  63234: "Left", 63232: "Up", 63235: "Right", 63233: "Down", 63302: "Insert", 63272: "Delete"};
  CodeMirror.keyNames = keyNames;
  (function() {
    // Number keys
    for (var i = 0; i < 10; i++) keyNames[i + 48] = String(i);
    // Alphabetic keys
    for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
    // Function keys
    for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
  })();

  return CodeMirror;
})();

define("external/codemirror", (function (global) {
    return function () {
        return global.CodeMirror;
    }
}(this)));

CodeMirror.defineMode("xml", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var Kludges = parserConfig.htmlMode ? {
    autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                      'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                      'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                      'track': true, 'wbr': true},
    implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                       'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                       'th': true, 'tr': true},
    contextGrabbers: {
      'dd': {'dd': true, 'dt': true},
      'dt': {'dd': true, 'dt': true},
      'li': {'li': true},
      'option': {'option': true, 'optgroup': true},
      'optgroup': {'optgroup': true},
      'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
            'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
            'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
            'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
            'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
      'rp': {'rp': true, 'rt': true},
      'rt': {'rp': true, 'rt': true},
      'tbody': {'tbody': true, 'tfoot': true},
      'td': {'td': true, 'th': true},
      'tfoot': {'tbody': true},
      'th': {'td': true, 'th': true},
      'thead': {'tbody': true, 'tfoot': true},
      'tr': {'tr': true}
    },
    doNotIndent: {"pre": true},
    allowUnquoted: true,
    allowMissing: true
  } : {
    autoSelfClosers: {},
    implicitlyClosed: {},
    contextGrabbers: {},
    doNotIndent: {},
    allowUnquoted: false,
    allowMissing: false
  };
  var alignCDATA = parserConfig.alignCDATA;

  // Return variables for tokenizers
  var tagName, type;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        }
        else if (stream.match("--")) return chain(inBlock("comment", "-->"));
        else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        }
        else return null;
      }
      else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      }
      else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        stream.eatSpace();
        tagName = "";
        var c;
        while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) tagName += c;
        state.tokenize = inTag;
        return "tag";
      }
    }
    else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");          
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    }
    else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag";
    }
    else if (ch == "=") {
      type = "equals";
      return null;
    }
    else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      return state.tokenize(stream, state);
    }
    else {
      stream.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  var curState, setStyle;
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }

  function pushContext(tagName, startOfLine) {
    var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) || (curState.context && curState.context.noIndent);
    curState.context = {
      prev: curState.context,
      tagName: tagName,
      indent: curState.indented,
      startOfLine: startOfLine,
      noIndent: noIndent
    };
  }
  function popContext() {
    if (curState.context) curState.context = curState.context.prev;
  }

  function element(type) {
    if (type == "openTag") {
      curState.tagName = tagName;
      return cont(attributes, endtag(curState.startOfLine));
    } else if (type == "closeTag") {
      var err = false;
      if (curState.context) {
        if (curState.context.tagName != tagName) {
          if (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase())) {
            popContext();
          }
          err = !curState.context || curState.context.tagName != tagName;
        }
      } else {
        err = true;
      }
      if (err) setStyle = "error";
      return cont(endclosetag(err));
    }
    return cont();
  }
  function endtag(startOfLine) {
    return function(type) {
      if (type == "selfcloseTag" ||
          (type == "endTag" && Kludges.autoSelfClosers.hasOwnProperty(curState.tagName.toLowerCase()))) {
        maybePopContext(curState.tagName.toLowerCase());
        return cont();
      }
      if (type == "endTag") {
        maybePopContext(curState.tagName.toLowerCase());
        pushContext(curState.tagName, startOfLine);
        return cont();
      }
      return cont();
    };
  }
  function endclosetag(err) {
    return function(type) {
      if (err) setStyle = "error";
      if (type == "endTag") { popContext(); return cont(); }
      setStyle = "error";
      return cont(arguments.callee);
    };
  }
  function maybePopContext(nextTagName) {
    var parentTagName;
    while (true) {
      if (!curState.context) {
        return;
      }
      parentTagName = curState.context.tagName.toLowerCase();
      if (!Kludges.contextGrabbers.hasOwnProperty(parentTagName) ||
          !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext();
    }
  }

  function attributes(type) {
    if (type == "word") {setStyle = "attribute"; return cont(attribute, attributes);}
    if (type == "endTag" || type == "selfcloseTag") return pass();
    setStyle = "error";
    return cont(attributes);
  }
  function attribute(type) {
    if (type == "equals") return cont(attvalue, attributes);
    if (!Kludges.allowMissing) setStyle = "error";
    return (type == "endTag" || type == "selfcloseTag") ? pass() : cont();
  }
  function attvalue(type) {
    if (type == "string") return cont(attvaluemaybe);
    if (type == "word" && Kludges.allowUnquoted) {setStyle = "string"; return cont();}
    setStyle = "error";
    return (type == "endTag" || type == "selfCloseTag") ? pass() : cont();
  }
  function attvaluemaybe(type) {
    if (type == "string") return cont(attvaluemaybe);
    else return pass();
  }

  return {
    startState: function() {
      return {tokenize: inText, cc: [], indented: 0, startOfLine: true, tagName: null, context: null};
    },

    token: function(stream, state) {
      if (stream.sol()) {
        state.startOfLine = true;
        state.indented = stream.indentation();
      }
      if (stream.eatSpace()) return null;

      setStyle = type = tagName = null;
      var style = state.tokenize(stream, state);
      state.type = type;
      if ((style || type) && style != "comment") {
        curState = state;
        while (true) {
          var comb = state.cc.pop() || element;
          if (comb(type || style)) break;
        }
      }
      state.startOfLine = false;
      return setStyle || style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      if ((state.tokenize != inTag && state.tokenize != inText) ||
          context && context.noIndent)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      if (context && /^<\//.test(textAfter))
        context = context.prev;
      while (context && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return 0;
    },

    compareStates: function(a, b) {
      if (a.indented != b.indented || a.tokenize != b.tokenize) return false;
      for (var ca = a.context, cb = b.context; ; ca = ca.prev, cb = cb.prev) {
        if (!ca || !cb) return ca == cb;
        if (ca.tagName != cb.tagName || ca.indent != cb.indent) return false;
      }
    },

    electricChars: "/"
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

define("external/codemirrorXmlMode", ["external/codemirror"], (function (global) {
    return function () {
        return global.CodeMirror;
    }
}(this)));



// This creates a CSL code editor with real time preview
//
// It uses CodeMirror to provide the code editing view

define('src/CodeEditor',[	'src/citationEngine',
			'src/options',
			'src/dataInstance',
			'src/urlUtils',
			'external/codemirror',
			'external/codemirrorXmlMode',
			'jquery.layout'
		],
		function (
			CSLEDIT_citationEngine,
			CSLEDIT_options,
			CSLEDIT_data,
			CSLEDIT_urlUtils,
			CodeMirror,
			CodeMirrorXmlMode,
			jquery_layout
		) {
	// Creates a CSL Code Editor within containerElement
	var CSLEDIT_codeEditor = function (
			containerElement,     // the selector or jQuery element to create the editor within
			configurationOptions  // see https://github.com/citation-style-editor/csl-editor/wiki/Code-Editor
			                      // for available options
			) {
		var codeTimeout,
			editor,
			diffTimeout,
			diffMatchPatch = new diff_match_patch(),
			oldFormattedCitation = "",
			newFormattedCitation = "",
			oldFormattedBibliography = "",
			newFormattedBibliography = "",
			styleURL;

		containerElement = $(containerElement);

		CSLEDIT_options.setOptions(configurationOptions);

		$.ajax({
			url: CSLEDIT_urlUtils.getResourceUrl("html/codeEditor.html"),
			success : function (data) {
				containerElement.html(data);
				init();
			},
			error : function (jaXHR, textStatus, errorThrown) {
				alert("Couldn't fetch page: " + textStatus);
			},
			cache : false,
			dataType : "text"
		});

		var init = function () {
			var codeMirrorScroll,
				codeMirrorContainer,
				userCallback = CSLEDIT_options.get("onChange");

			CodeMirror.defaults.onChange = function()
			{
				clearTimeout(codeTimeout);
				codeTimeout = setTimeout( function () {
					var result = CSLEDIT_data.setCslCode(editor.getValue());

					if ("error" in result) {
						$("#statusMessage").text(result.error);
						$("#formattedCitations").html("");
						$("#formattedBibliography").html("");
					} else {
						CSLEDIT_citationEngine.runCiteprocAndDisplayOutput(
							CSLEDIT_data,
							$("#statusMessage"),
							$("#formattedCitations"), $("#formattedBibliography"));
					}

					if (typeof(userCallback) !== "undefined") {
						userCallback(editor.getValue());
					}
				}, 500);
			};

			editor = CodeMirror.fromTextArea($("#code")[0], {
					mode: { name: "xml" },
					lineNumbers: true
			});

			CSLEDIT_data.initPageStyle( function () {
				editor.setValue(CSLEDIT_data.getCslCode());
			});

			codeMirrorScroll = $('.CodeMirror-scroll');
			codeMirrorContainer = $('#codeMirrorContainer');
			
			var resizeCodeEditor = function () {
				
				codeMirrorScroll.css({
					height: codeMirrorContainer.height() + "px"
				});
			};

			containerElement.layout({
				north__size : 300,
				livePaneResizing : true,
				onresize : resizeCodeEditor
			});

			resizeCodeEditor();
		}
	};

	return CSLEDIT_codeEditor;
});
