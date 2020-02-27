const generateSocialMediaLinksFromUserName = (socialMediaLinks) =>{
    
    let updatedSocialMediaLinkObject = {};

    for(let x in socialMediaLinks){
        
        // Check whether the x is an already present social link
        let fullLinkExists = socialMediaLinks[x].includes('http');

        if(fullLinkExists){
            updatedSocialMediaLinkObject[x] = socialMediaLinks[x];
        }else{
            switch(x){
                case 'facebook':
                    updatedSocialMediaLinkObject['facebook'] = `https://facebook.com/${socialMediaLinks[x]}`
                    return ;
                case 'instagram':
                    updatedSocialMediaLinkObject['instagram'] = `https://instagram.com/${socialMediaLinks[x]}`
                    return ;            
                case 'youtube':
                    updatedSocialMediaLinkObject['youtube'] = `https://youtube.com/channel/${socialMediaLinks[x]}`
                case 'tiktok':
                    updatedSocialMediaLinkObject['tiktok'] = `https://tiktok.com/@${socialMediaLinks[x]}`
                case 'twitter':
                    updatedSocialMediaLinkObject['twitter'] = `https://twitter.com/${socialMediaLinks[x]}`
                default:
                    updatedSocialMediaLinkObject[x] = `${socialMediaLinks[x]}`
                }

        }
    }
    return updatedSocialMediaLinkObject;
};

module.exports = { generateSocialMediaLinksFromUserName }