const _ = require("lodash");
const aws = require("aws-sdk");
const config = require("../config/config");
const { keys, includes } = require("lodash");

aws.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion
});
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRETACCESS_KEY
});

const textract = new aws.Textract();
function search( user , text){
  for (k in user) {
    if (k.toLowerCase().includes(text.toLowerCase()))
     return(user[k])
}
}
 
function userMatchesText(text, user) {
 if(user[keys.includes(text)])
  return user[keys]

}
 const getalldata = (data) => {
   let tab = [];
  tab = data.Blocks.map(el => el.Text)
 return tab;
 }
const getText = (result, blocksMap) => {
  let text = "";

  if (_.has(result, "Relationships")) {
    result.Relationships.forEach(relationship => {
      if (relationship.Type === "CHILD") {
        relationship.Ids.forEach(childId => {
          const word = blocksMap[childId];
          if (word.BlockType === "WORD") {
            text += `${word.Text} `;
          }
          if (word.BlockType === "SELECTION_ELEMENT") {
            if (word.SelectionStatus === "SELECTED") {
              text += `X `;
            }
          }
        });
      }
    });
  }

  return text.trim();
};

const findValueBlock = (keyBlock, valueMap) => {
  let valueBlock;
  keyBlock.Relationships.forEach(relationship => {
    if (relationship.Type === "VALUE") {
      // eslint-disable-next-line array-callback-return
      relationship.Ids.every(valueId => {
        if (_.has(valueMap, valueId)) {
          valueBlock = valueMap[valueId];
          return false;
        }
      });
    }
  });

  return valueBlock;
};

const getKeyValueRelationship = (keyMap, valueMap, blockMap) => {
  const keyValues = {};

  const keyMapValues = _.values(keyMap);

  keyMapValues.forEach(keyMapValue => {
    const valueBlock = findValueBlock(keyMapValue, valueMap);
    const key = getText(keyMapValue, blockMap);
    const value = getText(valueBlock, blockMap);
    keyValues[key] = value;
  });

  return keyValues;
};

const getKeyValueMap = blocks => {
  const keyMap = {};
  const valueMap = {};
  const blockMap = {};

  let blockId;
  blocks.forEach(block => {
    blockId = block.Id;
    blockMap[blockId] = block;

    if (block.BlockType === "KEY_VALUE_SET") {
      if (_.includes(block.EntityTypes, "KEY")) {
        keyMap[blockId] = block;
      } else {
        valueMap[blockId] = block;
      }
    }
  });

  return { keyMap, valueMap, blockMap };
};

module.exports = async (buffer , pathname  ) => {
 const params = {
    Document: {
      /* required */
      Bytes: buffer
    },
   FeatureTypes: ["TABLES","FORMS"]
  };
    if(pathname !== '.pdf' || pathname !== '.docx' ) {
  const request = textract.analyzeDocument(params);
  const data = await request.promise();

  if (data && data.Blocks) {
    const { keyMap, valueMap, blockMap } = getKeyValueMap(data.Blocks);
    const keyValues = getKeyValueRelationship(keyMap, valueMap, blockMap);
    const alldata = getalldata(data)
    try{
      let devise = search(valueMap, ['$','Dt','€'])
      let ht  = search(keyValues,['Ht','H.T'])
      let ttc  = search(keyValues,['ttc','payer' ,'total'])
      let tva = search(keyValues,['tva'])
      let date = search(keyValues,['date'])
      let client = search(keyValues,['client','Envoyé à','destinataire','facture a','clt'])
      let facture = search(keyValues,['Facture' ,'n°' , 'numero'])
      let matricul = search(keyValues,['m.f','mf' ,'m/f','Matricul' ])
      let date_echance =  search(keyValues,['ECHEANCE','Échéance'])
      let methode_payement = search(keyValues,["MODE DE REGLEMENT","MODE DE Payement"])
  

      return {
        devise,
        ht,
        ttc ,
        tva,
        date,
        client,
        facture,
        matricul,
        date_echance,
        methode_payement 



      }
    }
    catch(err)
         {
         console.log(err)
         }
   // return keyValues;
  }
}
else {
  const request = textract.startDocumentTextDetection(params);
 const data = await request.promise();
  textract.detectDocumentText(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
   
        // const sacnfact = new global.App.scanfactureModel[(req.subdomains[1])].User(data)
        // sacnfact.save()
        //     .then(() => res.status(200).json("User added!"))
        //     .catch(err => res.status(200).json("Error: " + err));
        //  
      
      }
        
         
    })          // successful response
}
  //in case no blocks are found return undefined
 return undefined;
};


 // const params ={
    // DocumentLocation: {
    //   S3Object: {
    //     Bucket: 'textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312',
    //     Name: '1612195895387.sample.pdf'
    //   }
    // },
    // FeatureTypes: ["TABLES","FORMS"],
   // JobId:'f66bc7be09859849a6b0de82a5af1db3a3101b35383f91820f9a455d2c63651e'
  //};


  //const request = textract.getDocumentAnalysis (params);
//const request = textract.getDocumentTextDetection(params)
//const data = await request.promise()
//console.log(data)
  // if (data) {
  //  const { keyMap, valueMap, blockMap } = getKeyValueMap(data.Blocks);
  //  const keyValues = getKeyValueRelationship(keyMap, valueMap, blockMap);
  //  console.log(data)
  //   return keyValues;
  //  }
