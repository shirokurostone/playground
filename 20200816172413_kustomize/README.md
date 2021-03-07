kustomizeを触ってみる

```
kubectl kustomize overlays/staging    | kubectl apply -f -
kubectl kustomize overlays/production | kubectl apply -f -
```

## 参考リンク
https://kubernetes-sigs.github.io/kustomize/api-reference/kustomization/
https://github.com/kubernetes-sigs/kustomize/tree/v2.0.3/examples
