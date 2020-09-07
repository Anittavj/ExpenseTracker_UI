import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './card.css';

class Cards extends Component{
  type_check(type)
    {
        if(type ===0) return '#F35B8C';
        if(type ===1) return '#69B5FF';

    }
    render()
    {
      var items = this.props.items;
      return(      
           <div> 
                {items.map((item) =>( 
                    <Card key = {item.index} style={{width:"98%",paddingTop:"1%", paddingBottom:"1%", marginBottom:"1%"}}>
                        
                            <mat-card  class="card-container" style={{color:this.type_check(item.TYPE) }} >
                                <mat-card-title class="card-container-right" style={{font: "regular 18px/37px source sans pro" }}>{item.DATE}</mat-card-title>
                                <mat-card-title className="card-container-left"style={{font: "regular 18px/37px source sans pro" }} > {item.CATEGORY}
                                </mat-card-title>  
                            </mat-card>

                            <mat-card  class="card-container" style={{color:"#000000" }} >
                                <mat-card-title class="card-container-right" style={{font: " 18px Courier New"}} > {item.ITEM}</mat-card-title>
                                <mat-card-title className="card-container-left"  style={{font: " Bold 18px  source sans pro"}}> {item.AMOUNT}
                                </mat-card-title>  
                            </mat-card>
                    </Card>
                ))}
        </div>   
        
       

        );
    }
}

export default Cards;

