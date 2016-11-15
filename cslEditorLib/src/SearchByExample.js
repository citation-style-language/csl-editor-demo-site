


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

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

var Mustache;

(function (exports) {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports; // CommonJS
  } else if (typeof define === "function") {
    define('external/mustache',[],exports); // AMD
  } else {
    Mustache = exports; // <script>
  }
}((function () {
  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.5.2";
  exports.tags = ["{{", "}}"];

  exports.parse = parse;
  exports.clearCache = clearCache;
  exports.compile = compile;
  exports.compilePartial = compilePartial;
  exports.render = render;

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Renderer = Renderer;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  // OSWASP Guidelines: escape all non alphanumeric characters in ASCII space.
  var jsCharsRe = /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;

  function quote(text) {
    var escaped = text.replace(jsCharsRe, function (c) {
      return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });

    return '"' + escaped + '"';
  }

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export these utility functions.
  exports.isWhitespace = isWhitespace;
  exports.isArray = isArray;
  exports.quote = quote;
  exports.escapeRe = escapeRe;
  exports.escapeHtml = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Renderer() {
    this.clearCache();
  }

  Renderer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Renderer.prototype.compile = function (tokens, tags) {
    if (typeof tokens === "string") {
      tokens = parse(tokens, tags);
    }

    var fn = compileTokens(tokens),
        self = this;

    return function (view) {
      return fn(Context.make(view), self);
    };
  };

  Renderer.prototype.compilePartial = function (name, tokens, tags) {
    this._partialCache[name] = this.compile(tokens, tags);
    return this._partialCache[name];
  };

  Renderer.prototype.render = function (template, view) {
    var fn = this._cache[template];

    if (!fn) {
      fn = this.compile(template);
      this._cache[template] = fn;
    }

    return fn(view);
  };

  Renderer.prototype._section = function (name, context, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(context.push(value[i]), this);
        }

        return buffer;
      }

      return value ? callback(context.push(value), this) : "";
    case "function":
      // TODO: The text should be passed to the callback plain, not rendered.
      var sectionText = callback(context, this),
          self = this;

      var scopedRender = function (template) {
        return self.render(template, context);
      };

      return value.call(context.view, sectionText, scopedRender) || "";
    default:
      if (value) {
        return callback(context, this);
      }
    }

    return "";
  };

  Renderer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // From the spec: inverted sections may render text once based on the
    // inverse value of the key. That is, they will be rendered if the key
    // doesn't exist, is false, or is an empty list.
    if (value == null || value === false || (isArray(value) && value.length === 0)) {
      return callback(context, this);
    }

    return "";
  };

  Renderer.prototype._partial = function (name, context) {
    var fn = this._partialCache[name];

    if (fn) {
      return fn(context);
    }

    return "";
  };

  Renderer.prototype._name = function (name, context, escape) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    var string = (value == null) ? "" : String(value);

    if (escape) {
      return escapeHtml(string);
    }

    return string;
  };

  /**
   * Low-level function that compiles the given `tokens` into a
   * function that accepts two arguments: a Context and a
   * Renderer. Returns the body of the function as a string if
   * `returnBody` is true.
   */
  function compileTokens(tokens, returnBody) {
    var body = ['""'];
    var token, method, escape;

    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        method = (token.type === "#") ? "_section" : "_inverted";
        body.push("r." + method + "(" + quote(token.value) + ", c, function (c, r) {\n" +
          "  " + compileTokens(token.tokens, true) + "\n" +
          "})");
        break;
      case "{":
      case "&":
      case "name":
        escape = token.type === "name" ? "true" : "false";
        body.push("r._name(" + quote(token.value) + ", c, " + escape + ")");
        break;
      case ">":
        body.push("r._partial(" + quote(token.value) + ", c)");
        break;
      case "text":
        body.push(quote(token.value));
        break;
      }
    }

    // Convert to a string body.
    body = "return " + body.join(" + ") + ";";

    // Good for debugging.
    // console.log(body);

    if (returnBody) {
      return body;
    }

    // For great evil!
    return new Function("c, r", body);
  }

  function escapeTags(tags) {
    if (tags.length === 2) {
      return [
        new RegExp(escapeRe(tags[0]) + "\\s*"),
        new RegExp("\\s*" + escapeRe(tags[1]))
      ];
    }

    throw new Error("Invalid tags: " + tags.join(" "));
  }

  /**
   * Forms the given linear array of `tokens` into a nested tree structure
   * where tokens that represent a section have a "tokens" array property
   * that contains all tokens that are in that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        token.tokens = [];
        sections.push(token);
        collector.push(token);
        collector = token.tokens;
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token.value);
        }

        section = sections.pop();

        if (section.value !== token.value) {
          throw new Error("Unclosed section: " + section.value);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1].tokens;
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section.value);
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var lastToken;

    for (var i = 0; i < tokens.length; ++i) {
      var token = tokens[i];

      if (lastToken && lastToken.type === "text" && token.type === "text") {
        lastToken.value += token.value;
        tokens.splice(i--, 1); // Remove this token from the array.
      } else {
        lastToken = token;
      }
    }
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parse(template, tags) {
    tags = tags || exports.tags;

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var tokens = [],      // Buffer to hold the tokens
        spaces = [],      // Indices of whitespace tokens on the current line
        hasTag = false,   // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    var stripSpace = function () {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var type, value, chr;

    while (!scanner.eos()) {
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push({type: "text", value: chr});

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push({type: type, value: value});

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    squashTokens(tokens);

    return nestTokens(tokens);
  }

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default renderer.
  var _renderer = new Renderer();

  /**
   * Clears all cached templates and partials.
   */
  function clearCache() {
    _renderer.clearCache();
  }

  /**
   * High-level API for compiling the given `tokens` down to a reusable
   * function. If `tokens` is a string it will be parsed using the given `tags`
   * before it is compiled.
   */
  function compile(tokens, tags) {
    return _renderer.compile(tokens, tags);
  }

  /**
   * High-level API for compiling the `tokens` for the partial with the given
   * `name` down to a reusable function. If `tokens` is a string it will be
   * parsed using the given `tags` before it is compiled.
   */
  function compilePartial(name, tokens, tags) {
    return _renderer.compilePartial(name, tokens, tags);
  }

  /**
   * High-level API for rendering the `template` using the given `view`. The
   * optional `partials` object may be given here for convenience, but note that
   * it will cause all partials to be re-compiled, thus hurting performance. Of
   * course, this only matters if you're going to render the same template more
   * than once. If so, it is best to call `compilePartial` before calling this
   * function and to leave the `partials` argument blank.
   */
  function render(template, view, partials) {
    if (partials) {
      for (var name in partials) {
        compilePartial(name, partials[name]);
      }
    }

    return _renderer.render(template, view);
  }

  return exports;
}())));



// This fetches and caches the mustache templates, and
// runs mustache on them

define('src/mustache',
		[	'src/urlUtils',
			'src/debug',
			'external/mustache'
		],
		function (
			CSLEDIT_urlUtils,
			debug,
			Mustache
		) {

	// map of filename (minus .mustache extension) to contents
	var templateCache = {};

	var toHtml = function (templateName, data) {
		if (!(templateName in templateCache)) {
			$.ajax({
				url : CSLEDIT_urlUtils.getResourceUrl("html/" + templateName + ".mustache"),
				dataType : "text",
				success : function (data) {
					templateCache[templateName] = data;
				},
				error : function () {
					debug.assert(false, "Couldn't fetch mustache template: " + templateName);
				},
				async: false
			});
		}

		return Mustache.to_html(templateCache[templateName], data);
	};

	return {
		toHtml : toHtml
	};
});



// Sets up handlers or hides buttons to perfom actions on a style, e.g. install/edit/view

define('src/styleActionButtons',
		[	'src/options'
		],
		function (
			CSLEDIT_options
		) {

	var setupButtonHandler = function (button, func) {
		if (typeof(func) === "undefined") {
			button.css("display", "none");
		} else {
			button.click(function (event) {
				func($(event.target).attr("data-styleId"));
			});
		}
	};

	// Setup the event handlers or disable all appropriate buttons within the given element
	var setup = function (containerElement) {
		setupButtonHandler(containerElement.find('button.installStyle'), CSLEDIT_options.get('installStyle_func'));
		setupButtonHandler(containerElement.find('button.editStyle'), CSLEDIT_options.get('editStyle_func'));
		setupButtonHandler(containerElement.find('button.viewCode'), CSLEDIT_options.get('viewCode_func'));
	};

	return {
		setup : setup
	};
});



// Displays a list of CSL styles, optionally including the quality of the match
//
// Used in the Search by Name and Search by Example pages

define('src/searchResults',
		[	'src/options',
			'src/diff',
			'src/cslStyles',
			'src/xmlUtility',
			'src/mustache',
			'src/styleActionButtons',
			'src/debug'
		],
		function (
			CSLEDIT_options,
			CSLEDIT_diff,
			CSLEDIT_cslStyles,
			CSLEDIT_xmlUtility,
			CSLEDIT_mustache,
			CSLEDIT_styleActionButtons,
			debug
		) {	
	var outputNode;

	var closenessString = function (stringA, stringB) {
		var matchQuality = CSLEDIT_diff.matchQuality(stringA, stringB),
			closeness;

		if (matchQuality === 100) {
			closeness = "Perfect match!";
		} else {
			closeness = matchQuality + "% match";
		}

		return closeness;
	};

	// Displays the given search results
	//
	// - styles       - the search result data
	// - _outputNode  - the jQuery element to draw the search results within
	// - exampleIndex - the index of the example reference to use for the example citation
	var displaySearchResults = function (styles, _outputNode, exampleIndex /* optional */) {
		var index,
			style,
			resultsLimit = 30,
			outputData = {}; // for mustache

		outputNode = outputNode || _outputNode;
		
		outputNode.html("");

		exampleIndex = exampleIndex || 0;

		outputData.styles = [];
		for (index = 0; index < Math.min(styles.length, resultsLimit); index++)
		{
			var styleEntry = {};

			style = styles[index];
			if (style.masterId !== style.styleId)
			{
				styleEntry.parentStyleId = style.masterId;
				styleEntry.parentStyleURL = CSLEDIT_cslStyles.localURLFromZoteroId(style.masterId);
				styleEntry.parentStyleInfoURL = CSLEDIT_options.get("styleInfoURL") + "?styleId=" +
					encodeURIComponent(style.masterId);
				styleEntry.parentStyleTitle = CSLEDIT_cslStyles.styles().styleTitleFromId[style.masterId];
			}

			styleEntry.citation = CSLEDIT_cslStyles
				.exampleCitations()
				.exampleCitationsFromMasterId[style.masterId][exampleIndex]
				.formattedCitations[0];
			styleEntry.bibliography = CSLEDIT_cslStyles
				.exampleCitations()
				.exampleCitationsFromMasterId[style.masterId][exampleIndex]
				.formattedBibliography;
			
			if (typeof style.userCitation !== "undefined" &&
					style.userCitation !== "" &&
					styleEntry.citation !== "") {
				styleEntry.citationDiff = CSLEDIT_diff.prettyHtmlDiff(style.userCitation, styleEntry.citation);
				styleEntry.citationCloseness = closenessString(style.userCitation, styleEntry.citation);
			}

			if (typeof style.userBibliography !== "undefined" &&
					style.userBibliography !== "" &&
					styleEntry.bibliography !== "") {
				styleEntry.bibliographyDiff =
					CSLEDIT_diff.prettyHtmlDiff(
							style.userBibliography,
							CSLEDIT_xmlUtility.cleanInput(styleEntry.bibliography));
				styleEntry.bibliographyCloseness = closenessString(
						style.userBibliography,
						CSLEDIT_xmlUtility.cleanInput(styleEntry.bibliography));
			}

			if (CSLEDIT_cslStyles.topStyles.indexOf(style.styleId) !== -1) {
				styleEntry.featuredStyle = true;
			}

			styleEntry.styleTitle = CSLEDIT_cslStyles.styles().styleTitleFromId[style.styleId];
			styleEntry.localURL = CSLEDIT_cslStyles.localURLFromZoteroId(style.styleId);
			styleEntry.styleInfoURL = CSLEDIT_options.get("styleInfoURL") + "?styleId=" +
				encodeURIComponent(style.styleId);
			styleEntry.styleId = style.styleId;

			outputData.styles.push(styleEntry);
		}
		
		if (outputData.styles.length > 0) {
			outputData.numStyles = outputData.styles.length;
		} 

		outputNode.html(CSLEDIT_mustache.toHtml('searchResults', outputData));

		CSLEDIT_styleActionButtons.setup(outputNode);
	};

	return {
		displaySearchResults : displaySearchResults
	};
});



// A rich text toolbar with bold, italic, etc. buttons
//
// The functions are implemented using document.execCommand()

define('src/richTextToolbar',
		[	'src/urlUtils',
			'src/debug'
		],
		function (
			CSLEDIT_urlUtils,
			debug
		) {

	var toolbarElement;	
	var blurTimer;
	var clicking = false;
	var buttons = [];
	var currentCallback = null;

	var mouseX = 0;
	var mouseY = 0;

	var mouseupCallback = null;

	$(document).ready(function () {
		toolbarElement = $('<div class="toolbar richText has-arrow">');
		toolbarElement.append('<span class="pointer">');

		var addButton = function (style, title, innerHTML) {
			var button = $('<a>')
				.attr('href', '#')
				.attr('data-style', style)
				.attr('title', title)
				.append(innerHTML);

			buttons.push(button);
			toolbarElement.append(button);
		};

		addButton("bold", "Bold", "<b>B</b>");
		addButton("italic", "Italic", "<i>I</i>");
		addButton("underline", "Underline", "<u>U</u>");
		addButton("superscript", "Superscript", "x<sup>s</sup>");
		addButton("subscript", "Subscript", "x<sub>s</sub>");
		addButton("removeFormat", "Clear", "&nbsp;clear&nbsp;");

		toolbarElement.find('a').mousedown(function () {
			clicking = true;
		});
		toolbarElement.find('a').mouseup(function () {
			clicking = false;
		});

		toolbarElement.find('a').click(function (event) {
			var $this = $(this),
				exec;

			debug.assert("execCommand" in document, "execCommand not available");
			document.execCommand($this.attr('data-style'), false, null);
		
			updateButtonStates();

			if (currentCallback !== null) {
				currentCallback();
			}

			event.preventDefault();
		});

		toolbarElement.css({
			"display" : "inline-block",
			"overflow" : "visible",
			"position" : "absolute"
		});
		
		$(document).mousemove(function (e) {
			mouseX = e.pageX;
			mouseY = e.pageY;
		});

		$(document).mouseup(function () {
			if (mouseupCallback !== null) {
				mouseupCallback();
				mouseupCallback = null;
			}
		});
	});

	// Update the toggle state of each of the toolbar buttons
	// based on the text within the current selection
	var updateButtonStates = function () {
		debug.assert("queryCommandState" in document, "queryCommandState not available");
		$.each(buttons, function (i, button) {
			if (document.queryCommandState(button.attr('data-style')) === true) {
				button.addClass("selected");
			} else {
				button.removeClass("selected");
			}
		});
	};

	var hideToolbar = function () {
		toolbarElement.css("visibility", "hidden");
		currentCallback = null;
	};

	var showToolbar = function (container, callback, forceMouseX) {
		var cX = container.offset().left;
		var cWidth = container.width();
		var cY = container.offset().top;
		var cHeight = container.height();
		var toolbarWidth = toolbarElement.width();

		if (toolbarWidth === 0) {
			toolbarWidth = 161;
		}

		// default position
		var x = cWidth / 2 - toolbarWidth * 0.5;

		if (forceMouseX === true ||
				(mouseX >= cX && mouseX <= cX + cWidth &&
				mouseY >= cY && mouseY <= cY + cHeight)) {
			x = mouseX - toolbarWidth * 0.1 - cX;
		}

		x = Math.min(cWidth - toolbarWidth - 8, x);
		x = Math.max(0, x);

		toolbarElement.css({
			"display" : "inline-block",
			"bottom" : -25
		});

		if (x !== null) {
			toolbarElement.css("left", x);
		}

		currentCallback = callback;
		container.prepend(toolbarElement);
		toolbarElement.css("visibility", "visible");

	};

	var checkSelection = function (container, callback, forceMouseX) {
		var selection = window.getSelection();

		updateButtonStates();
		if (selection.anchorNode !== selection.focusNode ||
				selection.anchorOffset !== selection.focusOffset) {
			showToolbar(container, callback, forceMouseX);
		} else {
			if (toolbarElement.find("a.selected").length > 0) {
				showToolbar(container, callback, forceMouseX);
			} else {
				hideToolbar();
			}
		}
	};

	// Set up event handlers on a contenteditable element so that the toolbar
	// will pop up when required
	//
	// - container - a jQuery element which contains the 'editor'
	//               contenteditable div as a child
	// - editor    - the contenteditable div
	// - callback  - a function to call whenever the contents of
	//               'editor' are changed by document.execCommand()
	var attachTo = function (container, editor, callback) {
		editor.mousedown(function () {
			mouseupCallback = function () {
				checkSelection(container, callback, true);
			};
		});
		
		editor.keyup(function () {
			checkSelection(container, callback);
		});

		editor.blur(function () {
			if (!clicking) {
				hideToolbar();
			}
		});
	};

	return {
		attachTo : attachTo,
		updateButtonStates : updateButtonStates
	};
});



// A basic rich text editor using a contenteditable div

define('src/RichTextEditor',
		[	'src/richTextToolbar',
			'src/xmlUtility'
		], function (
			CSLEDIT_richTextToolbar,
			CSLEDIT_xmlUtility
		) {
	// Create a RichTextEditor within the given containerElement
	var CSLEDIT_RichTextEditor = function (containerElement, onChange) {
		var that = this;

		this.editor = $('<div/>')
			.attr('contenteditable', 'true')
			.addClass('editor')
			.css("cursor", "text");

		if (containerElement.css("position") !== "absolute" &&
				containerElement.css("position") !== "relative") {
			containerElement.css("position", "relative");
		}
		
		var changed = function () {
			CSLEDIT_richTextToolbar.updateButtonStates();
			if (onChange) {
				onChange(that.value());
			}
		};

		var paste = function () {
			var oldSelectionNode = window.getSelection().anchorNode,
				oldSelectionOffset = window.getSelection().anchorOffset,				
				clone = that.editor.clone();

			containerElement.css({
				overflow: "hidden",
				height: containerElement.height()
			});
			containerElement.append(clone);
			that.editor.css({
				"position": "absolute",
				"left": "-1000px",
				"width": "500px"
			});

			setTimeout(function () {
				changed();
				clone.remove();
				that.editor.css({
					"position" : "",
					"left" : 0,
					"width" : ""
				});
				containerElement.css({
					overflow: "",
					height: ""
				});
				containerElement.append(that.editor);
				setTimeout(function () {
					var range = document.createRange();
					range.selectNodeContents(that.editor[0]);
					range.collapse(false);
					var selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange(range);
				}, 1);
			}, 1);
		};

		this.editor.append(containerElement.html());
		containerElement.html("");
		containerElement.append(this.editor);
		CSLEDIT_richTextToolbar.attachTo(containerElement, this.editor, changed);

		this.editor.mouseup(changed);
		this.editor.keyup(changed);
		this.editor.bind("drop", paste);
		this.editor.bind("paste", paste);
	};

	// Get/set the string represented by the rich text editor
	CSLEDIT_RichTextEditor.prototype.value = function (newValue) {
		if (typeof(newValue) === "undefined") {
			var cleaned = CSLEDIT_xmlUtility.cleanInput(this.editor.html(), true);
			if (cleaned !== this.editor.html()) {
				document.execCommand("undo");
				var range = document.createRange();
				range.selectNodeContents(this.editor[0]);
				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				if (cleaned === "") {
					// becuase inserting "" with insertHTML fails on firefox
					document.execCommand("delete");
				} else {
					document.execCommand("insertHTML", false, cleaned);
				}
			}
			return CSLEDIT_xmlUtility.cleanInput(cleaned);
		} else {
			this.editor.html(CSLEDIT_xmlUtility.cleanInput(newValue));
		}
	};

	return CSLEDIT_RichTextEditor;
});

//XRegExp 2.0.0 <xregexp.com> MIT License
var XRegExp;XRegExp=XRegExp||function(n){function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError("type RegExp expected");var f=i.replace.call(g(n)+(r||""),h,"");return u&&(f=i.replace.call(f,new RegExp("["+u+"]+","g"),"")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()==="[object "+t+"]"}function d(n){return n=n||{},n==="all"||n.all?n={natives:!0,extensibility:!0}:s(n,"string")&&(n=t.forEach(n,/[^\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope==="all"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?"on":"off"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e="default",rt="class",it={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},et=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,h=/([\s\S])(?=[\s\S]*\1)/g,nt=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,ft=i.exec.call(/()??/,"")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w="gim"+(l?"y":"");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError("can't supply flags when constructing one RegExp from another");return o(r)}if(y)throw new Error("can't call the XRegExp constructor within token definition functions");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?"":String(r),u=u===n?"":String(u),i.match.call(u,h))throw new SyntaxError("invalid duplicate regular expression flag");for(r=i.replace.call(r,/^\(\?([\w$]+)\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError("can't use flag g or y in mode modifier");return u=i.replace.call(u+t,h,""),""}),t.forEach(u,/[\s\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError("invalid regular expression flag "+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p==="["?a=rt:p==="]"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(""),i.replace.call(u,/[^gimy]+/g,"")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,"g"+(l?"y":"")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,""))},off:function(){throw new Error("extensibility must be installed before using addToken");}},t.addToken=c.off,t.cache=function(n,i){var r=n+"/"+(i||"");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},t.exec=function(n,t,i,u){var e=o(t,"g"+(u&&l?"y":""),u===!1?"y":""),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,"g")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,"regexp")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||"":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e="all"),s=o(u,e==="all"?"g":"",e==="all"?"":"g")):e==="all"&&(s=new RegExp(t.escape(String(u)),"g")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return"(?<"+r+">"}else if(i)return"\\"+(+i+f);return n},e=[],r,u;if(!(s(n,"array")&&n.length))throw new TypeError("patterns must be a nonempty array");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join("|"),i)},t.version="2.0.0",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,"")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),"g","")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+="",s(r,"function")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||"";if(f=u?a(u,i):-1,f<0)throw new SyntaxError("backreference to undefined group "+t);return n[f+1]||""}if(r==="$")return"$";if(r==="&"||+r==0)return n[0];if(r==="`")return n[n.length-1].slice(0,n[n.length-2]);if(r==="'")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError("backreference to undefined group "+t);return n[r]||""}throw new SyntaxError("invalid token "+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,"")||s)&&f.push(""):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(n,t){if(n[1]==="B"&&t===e)return n[0];throw new SyntaxError("invalid escape "+n[0]);},{scope:"all"}),u(/\[(\^?)]/,function(n){return n[1]?"[\\s\\S]":"\\b\\B"}),u(/(?:\(\?#[^)]*\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"}),u(/\\k<([\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError("backreference to undefined group "+n[0]);return"\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?"":"(?:)")}),u(/(?:\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"},{trigger:function(){return this.hasFlag("x")},customFlags:"x"}),u(/\./,function(){return"[\\s\\S]"},{trigger:function(){return this.hasFlag("s")},customFlags:"s"}),u(/\(\?P?<([\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError("can't use integer as capture name "+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("}),u(/\\(\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!=="0")throw new SyntaxError("can't use octal escape or backreference to undefined group "+n[0]);return n[0]},{scope:"all"}),u(/\((?!\?)/,function(){return this.hasFlag("n")?"(?:":(this.captureNames.push(null),"(")},{customFlags:"n"}),typeof exports!="undefined"&&(exports.XRegExp=t),t}();
//XRegExp Unicode Base 1.0.0
(function(n){function i(n){return n.replace(/[- _]+/g,"").toLowerCase()}function s(n){return n.replace(/\w{4}/g,"\\u$&")}function u(n){while(n.length<4)n="0"+n;return n}function f(n){return parseInt(n,16)}function r(n){return parseInt(n,10).toString(16)}function o(t){var e=[],i=-1,o;return n.forEach(t,/\\u(\w{4})(?:-\\u(\w{4}))?/,function(n){o=f(n[1]),o>i+1&&(e.push("\\u"+u(r(i+1))),o>i+2&&e.push("-\\u"+u(r(o-1)))),i=f(n[2]||n[1])}),i<65535&&(e.push("\\u"+u(r(i+1))),i<65534&&e.push("-\\uFFFF")),e.join("")}function e(n){return t["^"+n]||(t["^"+n]=o(t[n]))}var t={};n.install("extensibility"),n.addUnicodePackage=function(r,u){var f;if(!n.isInstalled("extensibility"))throw new Error("extensibility must be installed before adding Unicode packages");if(r)for(f in r)r.hasOwnProperty(f)&&(t[i(f)]=s(r[f]));if(u)for(f in u)u.hasOwnProperty(f)&&(t[i(u[f])]=t[i(f)])},n.addUnicodePackage({L:"0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05270531-055605590561-058705D0-05EA05F0-05F20620-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280840-085808A008A2-08AC0904-0939093D09500958-09610971-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDAAE0-AAEAAAF2-AAF4AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC"},{L:"Letter"}),n.addToken(/\\([pP]){(\^?)([^}]*)}/,function(n,r){var f=n[1]==="P"||n[2]?"^":"",u=i(n[3]);if(n[1]==="P"&&n[2])throw new SyntaxError("invalid double negation \\P{^");if(!t.hasOwnProperty(u))throw new SyntaxError("invalid or unknown Unicode property "+n[0]);return r==="class"?f?e(u):t[u]:"["+f+t[u]+"]"},{scope:"all"})})(XRegExp);

define("external/xregexp", (function (global) {
    return function () {
        return global.XRegExp;
    }
}(this)));



// Creates a Search by Example page

define('src/SearchByExample',
		[	'src/options',
			'src/exampleData',
			'src/uiConfig',
			'src/xmlUtility',
			'src/diff',
			'src/searchResults',
			'src/cslStyles',
			'src/urlUtils',
			'src/RichTextEditor',
			'src/mustache',
			'src/debug',
			'external/xregexp',
			'jquery.ui'
		],
		function (
			CSLEDIT_options,
			CSLEDIT_exampleData,
			CSLEDIT_uiConfig,
			CSLEDIT_xmlUtility,
			CSLEDIT_diff,
			CSLEDIT_searchResults,
			CSLEDIT_cslStyles,
			CSLEDIT_urlUtils,
			CSLEDIT_RichTextEditor,
			CSLEDIT_mustache,
			debug,
			XRegExp,
			jquery_ui
		) {
	// Creates a Search by Example page within mainContainer
	var CSLEDIT_SearchByExample = function (
			mainContainer,       // the selector or jQuery element to create the search tool within
			configurationOptions // see full list of options at
			                     // https://github.com/citation-style-editor/csl-editor/wiki/Search-By-Example
			) {
		var nameSearchTimeout,
			styleFormatSearchTimeout,
			exampleIndex = -1,
			defaultStyle = CSLEDIT_cslStyles.defaultStyleId,
			tolerance = 50,
			userCitations,
			userBibliographies,
			inputControlsElement,

			citationEditor,
			bibliographyEditor,

			oldCitation = "",
			oldBibliography = "",
			formChangedTimeout,
			exampleCitationsFromMasterId = CSLEDIT_cslStyles.exampleCitations().exampleCitationsFromMasterId,
			referencesToSearch = [];

		CSLEDIT_options.setOptions(configurationOptions);
		mainContainer = $(mainContainer);
		$.ajax({
			url: CSLEDIT_urlUtils.getResourceUrl("html/searchByExample.html"),
			success : function (data) {
				mainContainer.html(data);
				init();
			},
			error : function (jaXHR, textStatus, errorThrown) {
				alert("Couldn't fetch page: " + textStatus);
			},
			cache : false
		});

		var setSelectedControl = function (selected) {
			if (selected === "citation") {
				inputControlsElement.addClass("citationSelected");
				inputControlsElement.removeClass("bibliographySelected");
			} else {
				debug.assertEqual(selected, "bibliography");
				inputControlsElement.removeClass("citationSelected");
				inputControlsElement.addClass("bibliographySelected");
			}
			clearTimeout(formChangedTimeout);
			formChangedTimeout = setTimeout(formChanged, 50);
		};
		var getSelectedControl = function () {
			if (inputControlsElement.hasClass("citationSelected")) {
				return "citation";
			} 
			debug.assert(inputControlsElement.hasClass("bibliographySelected"));
			return "bibliography";
		};

		// used to display HTML tags for debugging
		var escapeHTML = function (string) {
			return $('<pre/>').text(string).html();
		};

		var calculateMatchQualities = function (referenceIndex, matchQualities /* optional */) {
			var userCitation = userCitations[referenceIndex],
				userBibliography = userBibliographies[referenceIndex];

			matchQualities = matchQualities || {};

			$.each(exampleCitationsFromMasterId, function (styleId, exampleCitations) {
				var exampleCitation = exampleCitations[referenceIndex];

				if (exampleCitation !== null && exampleCitation.statusMessage === "") {
					var formattedCitation = exampleCitation.formattedCitations[0];
					var cleanFormattedBibliography =
						CSLEDIT_xmlUtility.cleanInput(exampleCitation.formattedBibliography);

					var citationMatchQuality = 0;
					if (userCitation !== "") {
						citationMatchQuality = CSLEDIT_diff.matchQuality(
							userCitation, formattedCitation);
					}

					var bibliographyMatchQuality = 0;
					if (userBibliography !== "") {
						bibliographyMatchQuality = CSLEDIT_diff.matchQuality(
							userBibliography, cleanFormattedBibliography);
					}

					var thisMatchQuality = 0;
					if (perCharacterOrdering()) {
						thisMatchQuality += citationMatchQuality *
							Math.max(userCitation.length, formattedCitation.length);
						thisMatchQuality += bibliographyMatchQuality *
							Math.max(userBibliography.length, cleanFormattedBibliography.length);
					}
					else {
						thisMatchQuality += citationMatchQuality;
						thisMatchQuality += bibliographyMatchQuality;
					}

					// give tiny boost to top popular styles
					if (CSLEDIT_cslStyles.topStyles.indexOf(styleId) !== -1) {
						thisMatchQuality += 0.1;
					}

					if (thisMatchQuality > tolerance)
					{
						if (styleId in matchQualities) {
							matchQualities[styleId] += thisMatchQuality;
						} else {
							matchQualities[styleId] = thisMatchQuality;
						}
					}
				}
			});
		};

		var searchForStyle = function () {
			var result = [],
				matchQualities = [],
				citationMatchQuality,
				bibliographyMatchQuality,
				index = 0,
				styleId,
				exampleCitation,
				formattedCitation,
				thisMatchQuality,
				cleanFormattedBibliography;

			userCitations[exampleIndex] = citationEditor.value();
			userBibliographies[exampleIndex] = bibliographyEditor.value();

			debug.time("searchForStyle");

			if (!advancedMode()) {
				referencesToSearch = [];
				referencesToSearch[exampleIndex] = true;
			}

			matchQualities = {};
			// search all relevant citations
			$.each(referencesToSearch, function (referenceIndex, toSearch) {
				if (toSearch === true) {
					console.log("searching based on reference " + referenceIndex);
					calculateMatchQualities(referenceIndex, matchQualities);
				}
			});

			var matchQualityList = [];
			$.each(matchQualities, function (styleId, matchQuality) {
				matchQualityList.push({
					styleId : styleId,
					matchQuality : matchQuality / referencesToSearch.length
				});
			});

			matchQualityList.sort(function (a, b) {return b.matchQuality - a.matchQuality; });

			// top results
			$.each(matchQualityList, function (i, matchQuality) {
				result.push({
					styleId : matchQuality.styleId,
					masterId : matchQuality.styleId,
					userCitation : citationEditor.value(),
					userBibliography : bibliographyEditor.value(),
					matchQuality : Math.min(1, matchQuality.matchQuality)
				});
			});
			
			CSLEDIT_searchResults.displaySearchResults(result, $("#searchResults"), exampleIndex);
			debug.timeEnd("searchForStyle");
		};

		var perCharacterOrdering = function () {
			return $('#alternateSearch').is(":checked");
		};

		var personString = function (authors) {
			var result = [],
				index = 0;

			if (typeof(authors) === "undefined") {
				return "No authors";
			}

			for (index = 0; index < authors.length; index++) {
				result.push(authors[index].given + " " + authors[index].family);
			}
			return result.join(", ");
		};

		var tagMatches = function (string, matches) {
			var from = null,
				to = null,
				result = "";

			var getTagged = function () {
				return $('<div/>').append($('<mark/>)').text(string.substring(from, to + 1))).html();
			};

			$.each(string, function (i, char) {
				if (from === null) {
					if (matches[i]) {
						from = i;
						to = i;
					} else {
						// TODO: could be optimised if needed
						result += char;
					}
				} else {
					if (matches[i]) {
						to = i;
					} else if (char === " " && matches[i + 1]) {
						to = i + 1;
					} else {
						result += getTagged();
						result += char;
						from = null;
					}
				}
			});

			if (from !== null) {
				result += getTagged();
			}

			return result;
		};

		var formatExampleDocument = function (userInput) {
			var jsonDocument = CSLEDIT_exampleData.jsonDocumentList[exampleIndex],
				fieldsNotToPartialMatch = ["abstract"],
				userWords,
				elideLimit = 500,
				outputData = {};
			
			if (typeof(userInput) !== "undefined") {
				userWords = userInput.toLowerCase().split(XRegExp('\\P{L}', 'g'));
				userWords.sort(function (a, b) { return b.length - a.length; });
			}

			outputData.fields = [];
			$.each(jsonDocument, function (key, value) {
				var order = CSLEDIT_uiConfig.fieldOrder.indexOf(key),
					valueString,
					valueStringLower,
					newValueString,
					matchingChars = [];

				if (order === -1) {
					order = CSLEDIT_uiConfig.fieldOrder.length;
				}

				if (key === "author" || key === "editor" || key === "translator") {
					valueString = personString(value);
				} else if (key === "issued" || key === "accessed") {
					valueString = value["date-parts"][0].join("/");
				} else if (typeof(value) === "object") {
					valueString = JSON.stringify(value);
				} else {
					valueString = value;
				}
				
				if (valueString.length > elideLimit) {
					valueString = valueString.substring(0, elideLimit) + "...";
				}

				if (valueString === "") {
					// skip empty field
					return true;
				} else if (typeof(userWords) !== "undefined")  {
					// check for a complete match
					if (new RegExp(valueString, "i").test(userInput)) {
						// All chars match
						$.each(valueString, function (i, char) {
							matchingChars[i] = true;
						});
					} else if (fieldsNotToPartialMatch.indexOf(key) === -1) {
						valueStringLower = valueString.toLowerCase();
						// highlight matches
						$.each(userWords, function (i, word) {
							var index,
								index2;

							if (word.length > 2) {
								index = valueStringLower.indexOf(word);
								while (index !== -1) {
									for (index2 = index; index2 < index + word.length; index2++) {
										matchingChars[index2] = true;
									}
									index = valueStringLower.indexOf(word, index + 1);
								}
							}
						});
					}
				}
			
				valueString = tagMatches(valueString, matchingChars);

				outputData.fields.push({
					key: CSLEDIT_uiConfig.capitaliseFirstLetter(key),
					value: valueString,
					order: order
				});
			});

			outputData.fields.sort(function (a, b) {return a.order - b.order; });

			$("#exampleDocument").html(CSLEDIT_mustache.toHtml("exampleMetadata", outputData));

			if (advancedMode()) {
				if (referencesToSearch[exampleIndex] === true) {
					$('#includeReference').prop("checked", true);
				} else {
					$('#includeReference').prop("checked", false);
				}
			}
		};

		var hasChanged = function () {
			var newCitation = citationEditor.value();
			var newBibliography = bibliographyEditor.value();

			if (newCitation !== oldCitation || newBibliography !== oldBibliography) {
				return true;
			} else {
				return false;
			}
		};

		var formChanged = function () {
			var userInput,
				words;

			if (hasChanged()) {
				$("#searchResults").html("<i>Click search to find similar styles</i>");
			}

			if (getSelectedControl() === "citation") {
				userInput = citationEditor.value();
			} else {
				userInput = bibliographyEditor.value();
			}
			
			formatExampleDocument(userInput);
		};

		var search = function () {
			var userCitation,
				userBibliography,
				timeout = 10;

			$("#styleFormatResult").html("<i>Searching...</i>");

			oldCitation = citationEditor.value();
			oldBibliography = bibliographyEditor.value();

			$("#searchResults").html("<p><emp>Searching for styles...</emp></p>");

			styleFormatSearchTimeout = setTimeout(searchForStyle, timeout);
		};

		var updateExample = function (newExampleIndex, initialising) {
			var length = exampleCitationsFromMasterId[defaultStyle].length;

			if (exampleIndex !== -1) {
				userCitations[exampleIndex] = citationEditor.value();
				userBibliographies[exampleIndex] = bibliographyEditor.value();
			}

			exampleIndex = (newExampleIndex + length) % length;

			formatExampleDocument();

			citationEditor.value(userCitations[exampleIndex]);
			bibliographyEditor.value(userBibliographies[exampleIndex]);
			
			if (initialising !== true) {
				formChanged();
			}
		};

		// Use advanced mode, with extra controls for power users
		// Accessible via ?advanced=true query string
		var advancedMode = function () {
			return CSLEDIT_urlUtils.getUrlVar("advanced") === "true";
		};

		var init = function () {
			inputControlsElement = $('#styleFormatInputControls');

			if (exampleCitationsFromMasterId[defaultStyle].length !==
					CSLEDIT_exampleData.jsonDocumentList.length) {
				alert("Example citations need re-calculating on server");
			}

			$("#inputTabs").tabs({
				show: function (event, ui) {
					if (ui.panel.id === "styleNameInput") {
						$("#styleNameResult").show();
						$("#styleFormatResult").hide();
					} else {
						$("#styleNameResult").hide();
						$("#styleFormatResult").show();
					}
				}
			});

			citationEditor = new CSLEDIT_RichTextEditor($("#userCitation"), function () {
				setSelectedControl("citation");
			});
			bibliographyEditor = new CSLEDIT_RichTextEditor($("#userBibliography"), function () {
				setSelectedControl("bibliography");
			});

			$('#searchButton').on("click", search);

			// prepopulate with example	citations
			userCitations = [];
			userBibliographies = [];
			$.each(exampleCitationsFromMasterId[defaultStyle],
					function (i, exampleCitation) {
				userCitations.push(exampleCitation.formattedCitations[0]);
				userBibliographies.push(exampleCitation.formattedBibliography);
			});

			updateExample(0, true);

			$('#nextExample').click(function () {
				updateExample(exampleIndex - 1);
			});
			$('#prevExample').click(function () {
				updateExample(exampleIndex + 1);
			});

			setSelectedControl("citation");

			if (advancedMode()) {
				$('#alternateSearch').click(function () {
					oldCitation = "";
					oldBibliography = "";
					formChanged();
				});

				$('#includeReference').click(function () {
					if ($(this).is(':checked')) {
						referencesToSearch[exampleIndex] = true;
					} else {
						referencesToSearch[exampleIndex] = false;
					}
				});

				$('#advancedControls').css('display', 'inline');
			}
		};
	};

	return CSLEDIT_SearchByExample;
});
