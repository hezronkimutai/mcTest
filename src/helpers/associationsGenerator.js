export default (sourceKey, targetKey) => [
  { sourceKey },
  { targetKey },
  { onDelete: "cascade" },
  { onUpdate: "cascade" },
];
