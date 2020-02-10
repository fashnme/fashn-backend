const elasticsearch = require('elasticsearch');
const  esClient =  new elasticsearch.Client({  host: [
    {
      host: "00eabe27a27b41cd9a16a200994233d2.us-east-1.aws.found.io",
      protocol:"https",
      port: 9243,
      auth: `elastic:JJCGho6I2ckRkedzTUCb8so7`,
    }
  ]
});
let array = [
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/81724992_170996627334488_5570278899485820698_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=XMNLk6Ol5Z0AX-EEwEF&oh=5d62b4121eab13012295e03caa51c399&oe=5E96D0B3",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/81986623_158798758751243_7069426688150272952_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=FsNIGW2l3V4AX9DbRi5&oh=454554daaeb8786ba1f54ad87f138985&oe=5EA039D9",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/80802016_471268940230608_7609605896578508878_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=QC8W-BZePY4AX_148an&oh=55c72ec90f33053b1b78dbb27f9aed53&oe=5E9AE2BB",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/79387273_2403315743314945_6297244462394821655_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=j16-MtxfgZkAX88-s29&oh=98c0948e0e7b1873a21bab8d2cb6d2f1&oe=5EA71437",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/71756229_746385629207871_5141255554000939008_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=kXcPoEM9nrAAX9Oc5Fo&oh=b50a0badefc31f4ecd1c72621d1f57c1&oe=5EB4BD62",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/75538158_482972682640397_8584897891533388944_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=bgvxk2m4ZSAAX_Z3Or4&oh=7e57a8fc69188264ba93c5b33d37fae1&oe=5ED91326",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/71676212_479003606079005_4980607423937615995_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=DlXAScGEIFYAX_6zUl9&oh=e9f1baf7871c39946f98bbeca3d9c364&oe=5ED9DD1D",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/75580689_432276077679995_7919678453080428256_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=F79JoV30GacAX9q4jRC&oh=d2c725457e6a6c330cba6f57f10ef034&oe=5E9B358B",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.179.1440.1440a/s640x640/80124835_583007695796842_6640228661220232691_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=BtybcWyCQA0AX_gDv-y&oh=0b259511cc36d11b0caa6cfdd81d7e55&oe=5EB650E3",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/80021661_856265241496636_2707072098578442484_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=FsZBZEWY-KAAX8XZFYl&oh=145ee4cb85ea515e84b862a208d866fe&oe=5EB6517C",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c180.0.1080.1080a/s640x640/81320940_186260995855759_3254191309836945696_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=UU7oOggZhjYAX-ldSLb&oh=14082297ab3caffef7182c57529efcbd&oe=5E94C455",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c240.0.960.960a/s640x640/79771520_525885614960329_3885440189688095808_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=6LmUFb-J5uQAX_bfXo6&oh=229b77926a63224c9cc45d0c94a5ecf6&oe=5E97A26B",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/e15/c0.90.720.720a/s640x640/81481511_792752931243449_4218851859778016505_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=Xo48MQqjf24AX8HR4o4&oh=d54340717bb5a1e8685b947d178ce244&oe=5EA5915A",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.100.1080.1080a/s640x640/79909310_2845308458869327_1293916543216292868_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=5FLhgNQi-UUAX-mI7Op&oh=f2293894bf8b4128fad11dbe7e7fec86&oe=5E933046",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/e35/c235.0.609.609a/81886003_777162409418044_7387663054509503311_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Sre_MIPyzewAX9pE9VW&oh=98942e46e988fb045917d73c9144622f&oe=5E923A24",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/80060691_183344596400087_8639595143270958393_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=Qj5ZvxvFuc8AX8XtSa0&oh=c0612ce61c842c0f8ac082462012689b&oe=5EA6E3B6",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/e35/c171.0.376.376a/81781819_162181518380219_1119074983129612401_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=ZVeyAS7s-Z0AX-ppZVF&oh=f42362e8c127be743cdba2c54513f1a8&oe=5EA9CD6E",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/80577637_480010222716392_4367349395635042446_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=BTjxnmLvKRoAX8ASg4u&oh=eca2f8ace4ca3fe163d473649f8a44cb&oe=5EB70734",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/80103001_844909122633980_2494649141273790473_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=DzTv1AQnmtcAX_mwHT4&oh=854dec84ed3a03564a8206be0768bb63&oe=5EA4CF20",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/82197739_605554973542774_4075908000926171277_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=iiqeOAE8PLIAX_juNPa&oh=8aa13055e739678dfb66db44871899bc&oe=5EB00EF0",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/79371401_713699135825468_4087206641054405034_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=AuqIu8qzKSQAX8nto41&oh=c17bfac0916d75452d864eebad5647f1&oe=5E99E782",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.169.1349.1349a/s640x640/82102833_448164146091174_2482974646110143476_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=4ui-AFVKWLAAX-ZlGyE&oh=913ad9ac77190c8ec7210f2206c3364b&oe=5EA2BBDB",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/e35/c167.0.637.637a/72787995_173760914009982_7511501889116435626_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=Ql14J2P30_IAX_yeQ4r&oh=e0d0eb5525a9019ce25f66a6699dc03d&oe=5ED8EA78",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.117.937.937a/s640x640/79957943_121556502373342_3661557323058720323_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=Hwgv9Kp3noQAX9RJjtL&oh=7b20d3a2fefd3bad458f06972ff5a52b&oe=5EA7A114",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/83120369_164874118123182_2591575003773438832_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=e35QTcNygxwAX8-8ry0&oh=e4487f7f2a7dd0992ceec77e1ca708aa&oe=5E9234C7",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.113.912.912a/s640x640/80397258_116967583155337_8251897614170027745_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=fs3lDDutJfIAX_pT2EA&oh=bcaedf27790f2e706f8cc92455be614a&oe=5E9DEFBC",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c241.0.958.958a/s640x640/82817337_118719719639367_749055251561596043_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=b8nP2DZcRsIAX8MyTkQ&oh=1eae4e9bd307955de76f17dd4c8c103f&oe=5EAA8813",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c133.0.671.671a/s640x640/80528066_613517579426274_86412359821621550_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=RmgTEzuKFvoAX_L3Hw5&oh=4661e83a35bd82976fd9b9230009c2df&oe=5EB4CDE8",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/79974986_2479416335518447_7411159659768177886_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=c4l6RnRWoTgAX9BCF7b&oh=60bde2832384c23468a10f4a8161b3a0&oe=5EB55100",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.63.900.900a/s640x640/82862588_188995565632584_6538672396694239932_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=svifYXZLpc4AX-1g8iH&oh=d0554b6c20297a4d18a817599e75b7c0&oe=5E97200C",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c162.0.755.755a/s640x640/81733095_113555426637459_55109978775607607_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=n3O9kXdV9y4AX8Q12U4&oh=8733015953152d17d63d801c413981c3&oe=5E996ABE",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/80016548_2989588634393694_725516646956191026_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=ZIbRV7uRzQIAX8mD5RY&oh=e4ce9d86a18b2778f592d3f46de994aa&oe=5E90F85F",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.171.1365.1365a/s640x640/83260870_600074050777373_2015990008348012376_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=oLEbXRQzylwAX9cjMuz&oh=6a7c4dbc30ad7d9936f57f864b590999&oe=5E99909D",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.173.1440.1440a/s640x640/81656794_190889225355541_4268176490483370522_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=MzIGirF13W8AX-u4dlO&oh=9f3f745da91a4cc97440007f3013d04b&oe=5EB4A8C5",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/81458319_646610619441905_8265457802859356310_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=mBO5p7BMMeMAX_EOzia&oh=2300dd5840ea04580ac33ed66a4f36d4&oe=5EA0550D",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    },
    {
      "caption": "this is some random caption for these posts",
      "uploadUrl": "https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/81902159_559892441534764_2441722323669883832_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Az0dHFvEbjEAX_59NxQ&oh=32bd15ae26ac126d126af708eb279897&oe=5EAB9A4C",
      "totalLikes": 0,
      "totalComments": 0,
      "taggedProducts": [],
      "userId": "PDo5gm8BMgKYZ1P4YhlZ"
    }
  ]
//   let body = array.push({})
let body = [];

array.forEach((ele,i)=>{  
   ele.timeStamp = new Date();
   ele.mediaType= "image";

    
    if(i%2==0){
        ele.userId = "YmiSjm8BuJISDM2-cz5j";
    }
    body.push({index: {_index:'post'}});
    body.push({...ele});

})

esClient.bulk({body}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})

// console.log(body[0],body[1])
