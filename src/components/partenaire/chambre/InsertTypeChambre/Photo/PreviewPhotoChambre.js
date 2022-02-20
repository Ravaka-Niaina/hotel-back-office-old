export default function PreviewPhotoChambre(props){
    let list = [];
    for(let i = 0; i < props.preview.length; i++){
      list.push(
        <img style={{maxWidth:'300px', maxHeight: '200px', width: 'auto', height: 'auto', margin: '2px 2px', padding: '0 0'}} src={props.preview[i]} />
      );
    }
    return list;
}