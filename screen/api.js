import React,{Component} from 'react';
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, Text,FlatList,Image, ActivityIndicator,Linking } from 'react-native';
 
export default class Api extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true
        }

 }

 renderItem = ({item}) =>{
     return(
        
         <TouchableOpacity style={{flex:1,flexDirection:'row', marginBottom:3}}
         onPress={() =>{Linking.openURL(item.url)}
         } >
             <Image style={{width:80,height:80,margin:5 }}
                 source={{ uri: item.urlToImage }} />
                 <View style={{flex:1,justifyContent: 'center',marginLeft:5 }}>
                 <Text style={{fontSize:18,color:'green', marginBottom:15}}>
                     {item.title}
                 </Text>

             </View>
         </TouchableOpacity>
         
         
     )
 }

 renderSeparator= ()=>{
     return(
         <View
         style={{ height:1,width:'100%',bckgroundColor:'black' }}>
         </View>
     )
 }

 componentDidMount() {
     const url ='https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=2719918152a7463492d900316ee90bf1'
     fetch(url)
     .then((response)=> response.json())
     .then((responseJson)=>{
         this.setState({
             dataSource:responseJson.articles,
             isLoading:false
         })
     })
     .catch((error)=>{
         console.log(error)
     })
 }



  render() {
    return (
        this.state.isLoading
        ?
        <View style={ { flex:1,justfyContent:'center',alignItems:'center',}}>
            <ActivityIndicator size="large" color="#330066" animating/>
        </View>
        :
      <View style={styles.MainContainer}>
          <FlatList 
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item,index)=> index}
        ItemSeparatorComponent={this.renderSeparator}

          />

      </View>
 
    );
  }
}
 
const styles = StyleSheet.create({
 
  MainContainer: {
 
    flex: 1,
    backgroundColor:'#F5FCFF',
  
  },
 
  button: {
 
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#DD2C00',
    borderRadius: 3,
    marginTop: 20
  },
 
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }
 
});