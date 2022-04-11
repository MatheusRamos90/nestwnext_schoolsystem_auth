import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumStatus } from 'src/enums/enum-status';

export type SubjectDocument = Subject & Document

@Schema({ collection: 'subject' })
export class Subject {

    @Prop({ required: [true, 'Name is required'], type: String })
    name: string;    

    @Prop({ required: [true, 'Status is required'] })
    status: EnumStatus;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
