TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

makeEdge = function (networkId, source, target, data) {
    return {
        group: 'edges',
        data:  {
          id: 'edge-' + Math.round( Math.random() * 1000000 ),
          'source' :source,
          'target' :target,
          data : data,
          name : ""
        },
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        networkId : networkId
    }
}
makeNode = function (networkId, nodeId, x, y, lat, lng, data){
    return {
        group: 'nodes',
        data: {
            id: nodeId ||" node-"+ Date.now(),
            lat : lat || 0,
            lng : lng || 0,
            starred : false,
            group : _.random(0,5), // add group
            data : data || {}
        },
        position: {
            x: x || Math.random() *800,
            y: y || Math.random() *600
        },
        networkId : networkId,
        createdAt: new Date(),            // current time
        owner: Meteor.userId()           // _id of logged in user
    }
};

TabularTables.NodesList = new Tabular.Table({
  name: "NodesList",
  collection: Nodes,
  columns : [
      { data: 'id',  title: 'ID' },
      { data: 'data.name',  title: 'Name' },
      { data: 'data.group',  title: 'Group' },
      { data: 'data.lat',  title: 'Latitude' },
      { data: 'data.lng',  title: 'Longitude' },
      { data: 'data.starred',  title: 'Starred' },
      {data: "createdAt", title: "Created At"}
    ]
});

TabularTables.EdgesList = new Tabular.Table({
  name: "EdgesList",
  collection: Edges,
  columns : [
    { data: 'data.id',  title: 'ID' },
    { data: 'source',  title: 'Source' },
    { data: 'target',  title: 'Target' },
    {data: "createdAt", title: "Created At"},
  ]
});
