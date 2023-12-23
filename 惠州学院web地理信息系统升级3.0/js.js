   //作者：钟志伟
   //学号：2104080109
   const name ='2104080109钟志伟'
    
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
                            "影像底图":YX,
                             "矢量底图": SL
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
                  //console.log(feature)
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

     function mousemove_get(){
      map.on('mousemove',function(e){
         
         latlng_view=document.querySelector('#latlng')
         latlng_view.innerHTML=`${truncateDecimal(e.latlng.lng,6)},${truncateDecimal(e.latlng.lat,6)}`
      })
     }
     function getlatlng(){
      const getlnglat_event=map.on('click',function(e){
      const glatlng=document.querySelector('#getlatlng')
      glatlng.value=`${truncateDecimal(e.latlng.lng,6)},${truncateDecimal(e.latlng.lat,6)}`
      })
      
     }
     

         function search()
      {
            const keyword = document.getElementById('searchInput').value;
            const resultDiv =document.getElementById('result')
           if(keyword=="")return
           resultDiv.innerHTML=""
            axios({
            url:'./hzu_geojson/建筑物.geojson',
            method:'get',
            }).then(result=>{
               //console.log(result.data.features)
               result.data.features.forEach(feature=>{
                   //console.log(feature)
                   
                   if (feature.properties.name.includes(keyword)) {
                    
                     resultDiv.innerHTML += `<p onmouseenter="highlight(this)" onclick="hl_value(this)">${feature.properties.name}</p>`;
                 
                   }
                })
            })
           
        }

        function displayResults(results) {
            // 清除之前的搜索结果
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // 在地图上显示搜索结果
            for (var i = 0; i < results.length; i++) {
                const result = results[i];
                const marker = L.marker([result[0], result[1]]).addTo(map);
                map.flyTo([result[0], result[1]],)
                marker.bindPopup("<b>" + result[2] + "</b><br>经度：" + result[0] + "<br>纬度：" + result[1]);
            }
        }


        function search_result()
        {
         const keyword = document.getElementById('searchInput').value;
         document.getElementById('searchInput').value=''
         const resultDiv =document.getElementById('result')
         if(keyword=="")return
         resultDiv.innerHTML=''
         axios({
            url:'./hzu_geojson/建筑物.geojson',
            method:'get',
            }).then(result=>{
               //console.log(result.data.features)
               result.data.features.forEach(feature=>{
                   //console.log(feature)
                   
                   if (feature.properties.name.includes(keyword)) {
                     const result = L.geoJSON(feature,{})
                     
                     console.log(result._layers[result._leaflet_id-1].feature.geometry.coordinates[0][0])
                     const latlng=result._layers[result._leaflet_id-1].feature.geometry.coordinates[0][0]
                     console.log(result._layers[result._leaflet_id-1].feature.properties.name) 
                     var results = [
                     [latlng[1],latlng[0],`${result._layers[result._leaflet_id-1].feature.properties.name}`] 
                    ];
                    displayResults(results);
                   }
                })
            })
        }

        function highlight(element) {
         // 移除其他p标签的高亮样式
         const pTags = document.querySelectorAll('p');
         pTags.forEach(p => {
             p.classList.remove('highlight');
         });

         // 为当前点击的p标签添加高亮样式
         element.classList.add('highlight');

         
     }

     function hl_value(element){
      //清除联想框的值
      document.getElementById('searchInput').value = element.innerText;
      element.innerHTML=''
     }

     //工具箱
     function Toolbox()
     {
      
      const toolbox = document.querySelector('.toolbox');
      document.querySelector('.toggle-btn').addEventListener('mousemove', function() {
             toolbox.style.display = 'block';
         
     });
     document.querySelector('.close').addEventListener('click',function(){
      toolbox.style.display = 'none';
     })
     toolbox.addEventListener('click',function(e){
      if(e.target.classList[1])
      {
         e.target.classList.remove('pressed')
      }else{
         e.target.classList.add('pressed')
      }
      
     })

     document.querySelector('#weather_tool').addEventListener('click',function(){

     const weather=document.querySelector('#weather')
      if(weather.style.display!='block'){weather.style.display = 'block';weather_forecast()}
      else{weather.style.display = 'none';}
     })

     document.querySelector('#get_lnglat_tool').addEventListener('click',function(){
     const get_lnglat=document.querySelector('#getlatlng')
     if(get_lnglat.style.display!='block'){get_lnglat.style.display = 'block';}
      else{get_lnglat.style.display = 'none';}
     })

     document.querySelector('#route_planning_tool').addEventListener('click',function(){
      const route_planning=document.querySelector('.route_planning')
      const navigation=document.querySelector('.navigation-box')
      if(route_planning.style.display!='block'){route_planning.style.display = 'block';
      }
      else{route_planning.style.display = 'none';navigation.style.display = 'none'}
     })
     }





     const key='80a9b2e3f2a72909b640d047ca9ce80a'
     //天气
     function weather_forecast(){
      
      const city='441302'
      axios({
         url:`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${key}`,
         method:'GET',
         
        }).then(result=>{
         weather_view=document.querySelector('#weather')
         weather_view.innerHTML=` 
         <h2>${result.data.lives[0].city}</h2>
         <p>空气湿度:${result.data.lives[0].humidity_float}</p>
         <p>天气现象:${result.data.lives[0].weather}</p>
         <p>温度:${result.data.lives[0].temperature}°C</p>
         <p>风向:${result.data.lives[0].winddirection} 风力:${result.data.lives[0].windpower}级</p>
         <p>更新时间:${result.data.lives[0].reporttime}</p>`
        })
     }



     //步行路径规划
     function route_planning(){
      let begin=document.querySelector('#begin_lnglat').value
      let end =document.querySelector('#end_lnglat').value
      const arr_begin=begin.split(',')
      const arr_end=end.split(',')
      begin=coordtransform.wgs84togcj02(arr_begin[0],arr_begin[1]).join(',')
      end=coordtransform.wgs84togcj02(arr_end[0],arr_end[1]).join(',')

      axios({
         url:`https://restapi.amap.com/v5/direction/walking?key=${key}&origin=${begin}&destination=${end}&show_fields=polyline`,
         method:'get'
      }).then(result=>{
         let line=[]
         let polyline1
         const navigation_route=document.querySelector('.navigation-route')
         const navigation_time=document.querySelector('#time')
         const navigation_mm=document.querySelector('#mm')
         console.log(result.data)
         result.data.route.paths[0].steps.forEach(function(item){
            const point_arr=item.polyline.split(';')
            point_arr.forEach(function(item){
             const latlng_arr= item.split(',')
            let res_latlng=coordtransform.gcj02towgs84(+latlng_arr[1],+latlng_arr[0])
             res_latlng=coordtransform.gcj02towgs84(+latlng_arr[0],+latlng_arr[1])
             line.push([+res_latlng[1],+res_latlng[0]])
               // if(polyline)
               // {
               //    map.removeLayer(polyline)
               // }
               //  polyline = L.polyline(line, {color: 'red'}).addTo(map);
           })
           const navigation=document.querySelector('.navigation-box')
           navigation.style.display = 'block'
           navigation_route.innerHTML+=`<p>${item.instruction}</p>`
           navigation_time.innerHTML=`预计时间${(+result.data.route.paths[0].cost.duration)/60}分钟`
           navigation_mm.innerHTML=`距离${(+result.data.route.paths[0].distance)/1000}公里`
           
         })
         let animation=[]
         let count=0
         let animation_line
         const animateDrawLine= setInterval(function(e){
               animation.push(line[count])
               if(animation_line&&count!==line.length)
               {
                  map.removeLayer(animation_line)
               }
                animation_line=L.polyline(animation,{color:'red',width:7}).addTo(map)
                console.log(animation_line)
               count++
               if(count===line.length)
               {
                  animation=[]
                  count=0
               }
            },20)
          polyline1 = L.polyline(line, {
            color:'#33FF33',
            width:5
         }).addTo(map)

        
           
          //鼠标进入建筑物时触发
          polyline1.on('mouseover',function(e){
         // console.log(e.layer.feature)
          const change_layer=L.polyline(line,{
            color:'black',
            fillColor:'black',
            width:15
          }).bindTooltip("导航路径",{
            permanent:true,
            sticky:true
          }).addTo(map)
          
           //鼠标退出建筑物时触发
           change_layer.on('mouseout',function(e){
          change_layer.removeFrom(map)
         })
         
         })
         
      })
     }


     

     