import "../styles/stats.scss"

import {Typography, IconButton,Divider} from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';

const CardItem = ({type, item, cardList, setCardList, showDelete, setModels, models}) => {
    
    const formatDia = (n) => {
            if(n === 1) return 'Lunes'
            else if(n === 2) return 'Martes'
            else if(n === 3) return 'Miércoles'
            else if(n === 4) return 'Jueves'
            else if(n === 5) return 'Viernes'
            else if(n === 6) return 'Sábado'
            
    }

    const deleteItem = (item) => {
        if(type==='collab'){
            setCardList([])
        }else{
            setCardList(cardList.filter(i => i.id !== item.id).map((i, index) => {
                if(index === 0){
                    return {...i, selected: true}
                }else{
                    return {...i, selected: false}
                }
            }))
        }
    }

    const clickCard = (item) => {
        if(cardList){
            const aux_list = cardList.map((i) => {
                if(i.id === item.id){
                    return {...i, selected: true}
                }else{
                    return {...i, selected: false}
                }
            })
            setCardList(aux_list)
        }
        
    }

   
    return (
        <div key={item.id} className={`card-stats`} style={{borderColor: `${type !=='collab' && type !=='model' && item.selected?item.color:''}`}}>
                        <div className='card-header'>
                            <div className='card-title'>
                                <Typography color={type !=='collab' && type !=='model' && item.color}>{item.nombre}</Typography>
                                <div className='card-fecha'>
                                    <span>{item.fecha}</span>
                                    <span>{item.hora}</span>
                                </div>
                            </div>
                            {showDelete && <IconButton className='button-ct' onClick={()=>deleteItem(item)}>
                                <ClearIcon/>
                            </IconButton>}
                        </div>
                        <Divider/>
                        <div className='card-content' onClick={() => clickCard(item)} style={{cursor:'pointer'}}>
                            <table>
                            <tbody>
                                <tr>
                                    <td>Comunas:</td>
                                    <td align='right'>
                                        {item.comuna.map(i => (
                                            <div key={i.id}>{i.nombre}</div>
                                        ))}
                                    </td>
                                </tr> 
                                <tr>
                                    <td>Día de recolección:</td>
                                    <td align='right'>{formatDia(item.frecuencia)}</td>
                                </tr> 
                                <tr>
                                    <td>Costo de transporte ($/km):</td>
                                    <td align='right'>{item.costo}</td>
                                </tr>
                                
                                <tr>
                                    <td>Generación de residuos (%):</td>
                                    <td align='right'>{`${item.residuos>0?'+':''}${item.residuos}%`}</td>
                                </tr>
                                <tr>
                                    <td>Jornada laboral (h/d):</td>
                                    <td align='right'>{item.jornada}</td>
                                </tr>
                                <tr>
                                    <td>Capacidad (t):</td>
                                    <td align='right'>{item.capacidad}</td>
                                </tr>
                                </tbody>
                            </table> 
                        </div>
                    </div> 
    )
}

export default CardItem