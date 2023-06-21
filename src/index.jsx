import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

import '@plantquest/assetmap'

import Pkg from '../package.json'


function PlantQuestAssetMap(props) {
  const {
    id,
    options,
    ready,
    assetinfo,
    assetcluster,
  } = props
  
  const [asset, setAsset] = useState(null)
  const [assets, setAssets] = useState(null)
  const [assetinfoContainer, setAssetinfoContainer] = useState(null)
  const [clusterinfoContainer, setClusterinfoContainer] = useState(null)


  useEffect(()=>{
    const reactInfo = {
      name: '@plantquest/assetmap-react',
      version: Pkg.version,
    }

    let pqam = window.PlantQuestAssetMap.make(id)
    
    let pqamReady = (err) => {
      pqam.log('INFO', reactInfo, window.PlantQuestAssetMap.info)
      pqam.info.react = reactInfo

      if(err) {
        if(ready) {
          ready(err, pqam)
        }
        return
      } 
      
      if(ready) {
        ready(null, pqam)
      } 
    }

    if(pqam.current.started) {
      pqam.render()
    }
    else {
      pqam.start(options, pqamReady)
    }
  },[options])


  useEffect(()=>{
    let pqam = window.PlantQuestAssetMap.make(id)

    pqam.listen('__plantquest_react_info__', (msg) => {
      if(
        'asset' === msg.show &&
          null != msg.asset &&
          'object' === typeof msg.asset
      )
      { 
        setAsset({...msg.asset})
      }
      else if('clusterclick' === msg.event && Array.isArray(msg.assets)) {
        setAssets(msg.assets)
      }
    })

    setAssetinfoContainer(pqam.getAssetInfoContainer())
    setClusterinfoContainer(pqam.getClusterInfoContainer())
  })
  
  let AIC = assetinfo
  let ACC = assetcluster

  return (
    <div
      data-plantquest-map-id={props.id}
      data-plantquest-map-mark={props.options.mark}
      style={{height: '100%', width: '100%'}}>

      <div id="plantquest-assetmap"></div>

      { assetinfoContainer &&
        createPortal(<AIC asset={asset} />, assetinfoContainer)
      }

      { clusterinfoContainer &&
        createPortal(<ACC assets={assets} />, clusterinfoContainer)
      }

     </div>
  )
}

export {
  PlantQuestAssetMap
}


