export abstract class AbstractCluster<T> {

    public id: number;

    public constructor(id: number) {
        this.id = id;
    }

    public abstract clusterElementIds(): number[];

    public abstract clusterElements(): T[];

    public abstract size(): number;

}
