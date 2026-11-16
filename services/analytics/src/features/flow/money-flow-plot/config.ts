const WIDE_LABEL_ROOM = 120;
const COMPACT_EDGE = 2;
const NARROW_WIDTH = 640;
const LABEL_GAP = 8;
const LABEL_RAISE_WITH_VALUE = 6;
const VALUE_DROP = 8;
const NODE_FIELDS = ['x', 'y', 'width', 'height', 'value'] as const;
const LINK_FIELDS = ['sourceX', 'sourceY', 'targetX', 'targetY', 'width', 'value'] as const;

export {
	COMPACT_EDGE,
	LABEL_GAP,
	LABEL_RAISE_WITH_VALUE,
	LINK_FIELDS,
	NARROW_WIDTH,
	NODE_FIELDS,
	VALUE_DROP,
	WIDE_LABEL_ROOM,
};
