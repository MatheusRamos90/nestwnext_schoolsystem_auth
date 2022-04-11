import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumRoles } from '../../../enums/enum-roles';

export type UserDocument = User & Document

@Schema({ collection: 'user' })
export class User {
    @Prop({ required: [true, 'Name is required'], type: String })
    name: string;

    @Prop({ 
        required: [true, 'E-mail is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        lowercase: true
    })
    email: string;

    @Prop()
    roles: Array<EnumRoles>;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);