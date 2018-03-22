import {TransformOptions} from "class-transformer";

export abstract class ClassSerialize<T> {
  public static readonly conf: TransformOptions = {toPlainOnly: true};

  abstract serialize(value: T): string;
}

export abstract class ClassDeserialize<T> {
  public static readonly conf: TransformOptions = {toClassOnly: true};

  abstract deserialize(value: string): T;
}
