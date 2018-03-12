//import { AngularFireDatabase} from 'angularfire2/database';
export class artefact{
    title:string;
    Details:string;
    images:any[] = [];
    //videos:string[] = [];
    //audios:string[] = [];
    id:number;
    
    constructor(public minor:number){
        this.id = minor;
    }

}