export type SubscriberOn<V, R = any> = (value: V) => R;
export type SubscriberConstructor<V> = (s: UpdateSubscription<V>) => SubscriberOn<V>;

export type UpdateSubscription<V, R = any> = (value: V, actors: Array<SubscriberOn<V>>) => R;

export function subscriptionFor<V>(
    ...subscriberConstructors: Array<SubscriberConstructor<V>>
): UpdateSubscription<V, void> {
    const updateSubscription = (value: V, actors: Array<SubscriberOn<V>>) => {
        subscribers.filter(s => !actors.includes(s)).forEach(s => s(value));
    }
    const subscribers = subscriberConstructors.map(c => c(updateSubscription));

    return updateSubscription;
}
