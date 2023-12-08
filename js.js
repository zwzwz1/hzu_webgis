
    const icon_on1=L.icon({
        iconUrl:'./校园.png',
        iconSize: [38, 50],
                        })
                        const YX=L.tileLayer('http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d4ded130df268fab61dfde0ae28cc758',
                        { subdomains:'01234567',maxNativeZoom:30})
                        const YXZJ=L.tileLayer('http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d4ded130df268fab61dfde0ae28cc758',
                        { subdomains:'01234567',maxNativeZoom:30})
                        const SL=L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d4ded130df268fab61dfde0ae28cc758',
                        { subdomains:'01234567',maxNativeZoom:30})
                        const SLZJ=L.tileLayer('http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d4ded130df268fab61dfde0ae28cc758',
                        { subdomains:'01234567',maxNativeZoom:30})
                    
                       //YX.addTo(map)
                        const baseLayers = {
                            "影像地图":YX,
                             "矢量图层": SL
                                            };
                    
                        const overlays = {
                             "影像标注": YXZJ,
                             "矢量标注": SLZJ,
                    
                                            };


   

    //图片渲染
   function image_init(){
      const svg=d3.select('svg')
      
    const defs=svg.append('svg:defs')
    const pattern=defs.append('svg:pattern')
    pattern.attr('id','green').attr('width',1024).attr('height',1024).attr('patternUnits','userSpaceOnUse');
    const image_green=pattern.append('svg:image');
    image_green.attr('href','./草地纹理.jpg').attr('width',1024).attr('height',1024).attr('x',0).attr('y',0)

    const defs_water=svg.append('svg:defs')
    const pattern_water=defs_water.append('svg:pattern')
    pattern_water.attr('id','water').attr('width',620).attr('height',620).attr('patternUnits','userSpaceOnUse');
    const image_water=pattern_water.append('svg:image');
    image_water.attr('href','./水系纹理.jpg').attr('width',620).attr('height',620).attr('x',0).attr('y',0)

    }
    


    
     function layercontrol()
     {
        const layercontrol= L.control.layers(baseLayers, overlays).addTo(map);
      
        YX.addTo(map)
      //   L.marker([23.039356986165267,114.4148075580597],{
      //       icon:icon_on1
      //  }).addTo(map);
       
      

       axios({
         url:'./hzu_geojson/绿地.geojson',
         method:'get',
        }).then(result=>{
         
         const greenLayer=L.geoJSON(result.data,{
          style:function(feature){
             return{
                fillOpacity:0.75,
                stroke:'false',
                color:'url(#green)',
                fill:'url(#green)'
             }
             
          }
            }).addTo(map)
            
         // layercontrol.addOverlay(greenLayer,"绿地")
       //   greenLayer.eachLayer(function(layer){
       //    const path=layer._path;
       //    path.setAttribute('fill','url(#green)')
 
       //   })
        })


        axios({
         url:'./hzu_geojson/道路面.geojson',
         method:'get',
        }).then(result=>{
         const road_p=L.geoJSON(result.data,{
          style: function (feature) {
             return {color: feature.properties.color="white",
                      fillColor:"#ada6a6",
                      fillOpacity:1};
 
          }
         }).addTo(map)
         // layercontrol.addOverlay(road_p,"道路")
        })
        
        const name ='zwzwz1'
       axios({
        url:'./hzu_geojson/建筑物.geojson',
        method:'get',
       }).then(result=>{
        const building=L.geoJSON(result.data,{
            style:function(feature){
               return{
               fillColor:'#eec694',
               fillOpacity:0.7,
               stroke:'false',
               color:'#898080',
               weight:1
            }},
           }).addTo(map)
        //鼠标进入建筑物时触发
        building.on('mouseover',function(e){
        // console.log(e.layer.feature)
         const change_layer=L.geoJSON(e.layer.feature,{
            style:function(feature){
               //console.log(feature)
               return{
               fillColor:'#eec694',
               fillOpacity:1,
               stroke:'false',
               color:'#898080',
               weight:7
               }
            }
         }).bindPopup(function (layer) {
            return `<div><p>名称:${layer.feature.properties.name}</p><p>楼层：${layer.feature.properties.floot}</p></div>`;
        }).addTo(map)
         
          //鼠标退出建筑物时触发
          change_layer.on('mouseout',function(e){
         change_layer.removeFrom(map)
        })
        
        })

       
      //   layercontrol.addOverlay(building,"建筑物")
       })

        
       axios({
        url:'./hzu_geojson/水域.geojson',
        method:'get',
       }).then(result=>{
        const water=L.geoJSON(result.data,{
         style:function(feature){
            return{
               fillOpacity:1,
               color:'url(#water)',
               fill:'false'
            }
         }
           }).addTo(map)
         
         water.on('mouseover',function(e){
            const water_layer=L.geoJSON(e.layer.feature,{
               style:function(feature){
                  console.log(feature)
                  return{
                     fillOpacity:1,
                     color:'#02319e',
                     fillColor:'url(#water)',
                     weight:7
                  }
               }
            })
            water_layer.on('mouseout',function(e){
               water_layer.removeFrom(map)
            })
            
            water_layer.bindPopup(`名称:${e.layer.feature.properties.name}`,{maxWidth:1000})
            water_layer.addTo(map)
         })
         L.control.attribution().addAttribution(name).setPrefix(false).addTo(map)
        //const center=hzu_polygon.getCenter()
      //   layercontrol.addOverlay(water,"水域")
       })

      



       axios({
        url:'./hzu_geojson/边界.geojson',
        method:'get',
       }).then(result=>{
        
        const bj=L.geoJSON(result.data,{
         style:function(feature){
            className:"boundary"
         }
           })   
        layercontrol.addOverlay(bj,"校园边界")
       })



       axios({
           url:'./hzu_geojson/运动场.geojson',
           method: 'get',
       }).then(result=>{
        const sport= L.geoJSON(result.data, {
            style: function (feature) {
       return {color: feature.properties.color="blue",
               fillColor:"#a3bbf7",
               fillOpacity:0.65,
               stroke:'false',
               color:'#aa9e8f'
               
         };}
            }).addTo(map)
         sport.on('mouseover',function(e){
            const sport_layer=L.geoJSON(e.layer.feature,{
               style:function(feature){
                  //console.log(feature)
                  return {
                  fillColor:"#a3bbf7",
                  fillOpacity:1,
                  color:'#aa9e8f',
                  weight:7
                  }
               }
            })
            sport_layer.on('mouseout',function(e){
               sport_layer.removeFrom(map)
            })
            sport_layer.bindPopup(`名称:${e.layer.feature.properties.name}`,{maxWidth:1000})
            sport_layer.addTo(map)
         })
   // layercontrol.addOverlay(sport, "运动场")
       })

    
     }
   

     
//     function Layercontrol()
//     {
//        const yx= document.querySelector('#yx')
//        const xl= document.querySelector('#xl')
//        yx.addEventListener('change',()=>{
//         if(yx.checked)
//         {
//             YX.addTo(map)
            
//         }
//         else{
//             YX.removeFrom(map)
//         }
        
//        })

//        xl.addEventListener('change',()=>{
//         if(xl.checked)
//         {
//             SL.addTo(map)
//         }
//         else{
//             SL.removeFrom(map)
//         }
//         })

//         axios({
//             url:'./hzu.json',
//             method: 'get',
//         }).then(result=>{
//          const hzu_point1= L.geoJSON(result.data, {
//     style: function (feature) {
//         return {color: feature.properties.color};
//     }
//  })
//     const hzupointcheck=document.querySelector('#hzu_point')
//     hzupointcheck.addEventListener('change',()=>{
//         if(hzupointcheck.checked)
//         {
//             hzu_point1.addTo(map)
//         }
//         else{
//             hzu_point1.removeFrom(map)
//         }
//     })
//     })
    
//     }

function truncateDecimal(num, decimalPlaces) {
   return Math.trunc(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
 }

     function mouse_get(){
      map.on('mousemove',function(e){
         
         latlng_view=document.querySelector('.latlng_view')
         latlng_view.innerHTML=`${truncateDecimal(e.latlng.lat,6)},${truncateDecimal(e.latlng.lng,6)}`
      })
     }