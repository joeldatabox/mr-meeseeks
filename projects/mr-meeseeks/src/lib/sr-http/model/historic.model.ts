import {Transform} from "class-transformer";
import {DateDeserialize, DateSerialize} from "./converter/date-serialize.model";

export class Historic {
  createdBy: string;
  @Transform(value => DateSerialize.serialize(value as any), DateSerialize.conf)
  @Transform(value => DateDeserialize.deserialize(value), DateDeserialize.conf)
  dtCreate: Date;
  lastChangeBy: string;
  @Transform(value => DateSerialize.serialize(value as any), DateSerialize.conf)
  @Transform(value => DateDeserialize.deserialize(value), DateDeserialize.conf)
  dtChange: Date;
}
