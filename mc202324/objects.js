objects = {
  '0': [
      { 
        name: 'mr.santa',
        symbol: 'mrs',
        position: [  9, 33 ],
        type: 'no-layout',
        visible: true,
        action: ( p, l ) => {
          if( p.checkInventiory( 'obj1', 'e' ) ) {
            p.deleteInventory( 'obj1' )
            p.addInventory( 
              'obj2',
              '[Mr Santa]: Can you grab me a donut while I finish my rehearsal?' 
            )
          }
          if( p.checkInventiory( 'obj3', 'e' ) ) {
            p.deleteInventory( 'obj3' )
            p.addInventory( 
              'obj4', 
              '[Mr Santa]: Can you check on Rudolf? She was feeling a bit blue, and I need her to be at her best shortly. She should be on MN4.' )
          }
          if( p.checkInventiory( 'obj15', 'e' ) ) {
            p.deleteInventory( 'obj15' )
            p.addInventory( 
              'obj16', 
              '[Mr Santa]: I just finished my rehearsal. It\'s not good. Can you help me load the sled with the presents? The sled is on the top floor.' )
            var loc = [
              { midx: '3', coord: [ 39, 24 ] }, 
              { midx: '3', coord: [ 30, 3 ] },
              { midx: '3', coord: [  2, 15 ] }, 
              { midx: '2', coord: [  1,  3 ] }, 
              { midx: '0', coord: [ 34, 10 ] }
             //  { midx: '0', coord: [ 5, 30 ] }
            ]
            loc.forEach( (x, idx) => {
              var present = createPresent( x.coord[ 0 ], x.coord[ 1 ], 'p.' + idx, createScriptPresent( x.midx, 'p.' + idx ) )
              addObject( x.midx, present )
            } )
          }
          if( p.checkInventiory( 'obj26', 'e' ) ) {
            p.deleteInventory( 'obj26' )
            p.addInventory( 
              'obj27', 
              '[Mr Santa]: Thank you a lot! I\'m stating my last rehearsal, and just remembered I didn\'t put the start to the tree. It\'s in my office, could you?'
            )
          }
          if( p.checkInventiory( 'obj29', 'e' ) ) {
            p.deleteInventory( 'obj29' )
            p.addInventory( 
              'obj30', 
              '[Santa]: Thanks a lot! All is ready! Let\'s do it!'
            )
            update_state( 2 )
          }
          return true 
        }
      },
      { 
        name: 'donut',
        symbol: 'dnt',
        position: [ 41, 10 ],
        type: 'no-layout',
        visible: true,
        action: ( p, l ) => { 
          if( p.checkInventiory( 'obj2', 'e' ) ) {
            p.deleteInventory( 'obj2' )
            p.addInventory( 
              'obj3', 
              '[me]: I should bring the donut to Mr Santa' 
            )
            removeObject( '0', 'donut' )
          }
          return true 
        }
      },
      {
        name: 'tree',
        symbol: 'tre',
        position: [ 10, 27 ],
        type: 'no-layout',
        visible: true,
        action: ( p, l ) => { 
          if( p.checkInventiory( 'obj28', 'e' ) ) {
            p.deleteInventory( 'obj28' )
            p.addInventory( 
              'obj29', 
              '[me]: It\'s done! I think all is ready for tonight. Let\'s see if Mr Santa is ready.' 
            )
          }
          return true 
        }
      }
    ],
  '1': [
      { 
        name: 'ms.rudolf',
        symbol: 'mrr',
        position: [ 17, 16 ],
        type: 'no-layout',
        visible: true,
        action: ( p, l ) => { 
          if( p.checkInventiory( 'obj4', 'e' ) ) {
            p.deleteInventory( 'obj4' )
            p.addInventory( 
              'obj5', 
              '[Ms Rudolf]: I\'m feeling exhausted lately, could you ask Ms Santa for something to wake me up?' 
            )
          }
          if( p.checkInventiory( 'obj10', 'e' ) ) {
            p.deleteInventory( 'obj10' )
            p.addInventory( 
              'obj11', 
              '[Ms Rudolf]: Oh! Thank you! Let\'s see if it works. Meanwhile, could you go get the reports from Mr Triton?' 
            )
          }
          if( p.checkInventiory( 'obj14', 'e' ) ) {
            p.deleteInventory( 'obj14' )
            p.addInventory( 
              'obj15', 
              '[Ms Rudolf]: Thanks a lot. I\'ll share this with my team. I think Santa needs something if you can help.'
            )
          }
          return true 
        }
      }
  ],
  '2': [
    { 
      name: 'ms. santa - box 1',
      symbol: 'b',
      position: [ 1, 5 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => { 
        if( p.checkInventiory( 'obj6', 'e' ) ) {
          p.deleteInventory( 'obj6' )
          p.addInventory( 
            'obj7', 
            '[me]: Let\'s move up this box first.' 
          )
          removeObject( '2', 'ms. santa - box 1' )
        }
        if( p.checkInventiory( 'obj8', 'e' ) ) {
          p.deleteInventory( 'obj8' )
          p.addInventory( 
            'obj9', 
            '[me]: Let\'s bring the second box to Ms Santa.' 
          )
          removeObject( '2', 'ms. santa - box 1' )
        }
        return true 
      }
    },
    { 
      name: 'ms. santa - box 2',
      symbol: 'b',
      position: [ 1, 6 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => { 
        if( p.checkInventiory( 'obj6', 'e' ) ) {
          p.deleteInventory( 'obj6' )
          p.addInventory( 
            'obj7', 
            '[me]: Let\'s move up this box first.' 
          )
          removeObject( '2', 'ms. santa - box 2' )
        }
        if( p.checkInventiory( 'obj8', 'e' ) ) {
          p.deleteInventory( 'obj8' )
          p.addInventory( 
            'obj9', 
            '[me]: Let\'s bring the second box to Ms Santa.' 
          )
          removeObject( '2', 'ms. santa - box 2' )
        }
        return true 
      }
    }
  ],
  '3': [ 
    { 
      name: 'ms. santa',
      symbol: 'mss',
      position: [ 25, 9 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => { 
        if( p.checkInventiory( 'obj5', 'e' ) ) {
          p.deleteInventory( 'obj5' )
          p.addInventory( 
            'obj6', 
            '[Ms Santa]: Oh dear, yes. Can you help me bring the boxes from the main floor here? I\'m sure I have something for her.' 
          )
        }
        if( p.checkInventiory( 'obj7', 'e' ) ) {
          p.deleteInventory( 'obj7' )
          p.addInventory( 
            'obj8', 
            '[Ms Santa]: Thanks. There was a second one, right?' 
          )
        }
        if( p.checkInventiory( 'obj9', 'e' ) ) {
          p.deleteInventory( 'obj9' )
          p.addInventory( 
            'obj10', 
            '[Ms Santa]: Thanks! I think this might help her. Bring it to her.' 
          )
        }
        return true 
      }
    },
    { 
      name: 'ms. triton',
      symbol: '@',
      position: [ 27, 20 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => {
        if( p.checkInventiory( 'obj11', 'e' ) ) {
          p.deleteInventory( 'obj11' )
          p.addInventory( 
            'obj12', 
            '[Mr Triton]: Oh! I\'m not done! I need the geographical information from Gen. If you bring it to me, I\'ll finish in a minute.'
          )
        }
        if( p.checkInventiory( 'obj13', 'e' ) ) {
          p.deleteInventory( 'obj13' )
          p.addInventory( 
            'obj14', 
            '[Mr Triton]: Here is the report for Ms Rudolf. I hope her team is up to the task, this year there are a lot of kids.'
          )
        }
        return true 
      }
    },
    { 
      name: 'mr. gin',
      symbol: '%',
      position: [ 40, 15 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => {
        if( p.checkInventiory( 'obj12', 'e' ) ) {
          p.deleteInventory( 'obj12' )
          p.addInventory( 
            'obj13', 
            '[Mr Gen]: I just finished listing the locations of all the good and bad kids worldwide. Bring it to Triton ASAP, thanks!'
          )
        }
        return true 
      }
    },
    { 
      name: 'star',
      symbol: 'str',
      position: [ 41, 3 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => {
        if( p.checkInventiory( 'obj27', 'e' ) ) {
          p.deleteInventory( 'obj27' )
          p.addInventory( 
            'obj28', 
            '[me]: The mighty start! Let\'s place on the top of the tree!'
          )
          removeObject( '3', 'star' )
        }
        return true 
      }
    }
  ],
  '4': [
    { 
      name: 'sled',
      symbol: 'sle',
      position: [ 14, 15 ],
      type: 'no-layout',
      visible: true,
      action: ( p, l ) => {
        if( p.checkInventiory( 'obj17', 'e' ) ) {
          p.deleteInventory( 'obj17' )
          p.addInventory( 'obj18', '[me]: Let\'s go look for another one!' )
        }
        if( p.checkInventiory( 'obj19', 'e' ) ) {
          p.deleteInventory( 'obj19' )
          p.addInventory( 'obj20', '[me]: Let\'s go look for another one!' )
        }
        if( p.checkInventiory( 'obj21', 'e' ) ) {
          p.deleteInventory( 'obj21' )
          p.addInventory( 'obj22', '[me]: Let\'s go look for another one!' )
        }
        if( p.checkInventiory( 'obj23', 'e' ) ) {
          p.deleteInventory( 'obj23' )
          p.addInventory( 'obj24', '[me]: Let\'s go look for another one!' )
        } 
        if( p.checkInventiory( 'obj25', 'e' ) ) {
          p.deleteInventory( 'obj25' )
          p.addInventory( 'obj26', '[me]: Better to report to Mr Santa' )
        } 
        return true 
      }
    } 
  ]
}

const map_objects = ( x, y, list ) => {
  var obj = list.filter( (o) => o.position[ 0 ] == x & o.position[ 1 ] == y & o.visible )
  if( obj.length > 1 ) {
    console.error( '[ERROR] Identified more than one obeject in (' + x + ', ' + y + ')' )
  }
  if( obj.length == 0 ) {
    return [ false,  {} ]
  } else {
    return [ true, obj[ 0 ] ]
  }
}
 

const transform_to_matrix = ( obj, lyt ) => {
  var x = Object.entries( lyt ).sort( ( a, b ) => { 
    return parseInt( a[ 0 ] ) - parseInt( b[ 1 ] )
  } )
  var rst = x.map( ( lvl ) => {
    var mat = []
    for( var ii = 0; ii < lvl[ 1 ]._lyt.length; ii++ ) {
      mat.push( [] )
      for( var jj = 0; jj < lvl[ 1 ]._lyt[ 0 ].length; jj++ ) {
        mat[ ii ][ jj ] = ''
        Object.entries( obj ).forEach( (o) => {
          if( o[ 0 ] == lvl[ 0 ] ) {
            o[ 1 ].forEach( (item) => {
              if( item.position[ 0 ] == ii && item.position[ 1 ] == jj && item.visible ) {
                mat[ ii ][ jj ] = item.symbol
              }
            } )
          }
        } )
      }
    }
    return mat
  } )
  return rst
}

const createScriptPresent = ( midx, name ) => {
  return function ( p, l ) {
    if( p.checkInventiory( 'obj16', 'e' ) ) {
      p.deleteInventory( 'obj16' )
      p.addInventory( 'obj17', '[me]: Here is one of the packs!' )
      removeObject( midx, name )
    }
    if( p.checkInventiory( 'obj18', 'e' ) ) {
      p.deleteInventory( 'obj18' )
      p.addInventory( 'obj19', '[me]: And another one!' )
      removeObject( midx, name )
    }
    if( p.checkInventiory( 'obj20', 'e' ) ) {
      p.deleteInventory( 'obj20' )
      p.addInventory( 'obj21', '[me]: And here I\'m carrying the third one' )
      removeObject( midx, name )
    }
    if( p.checkInventiory( 'obj22', 'e' ) ) {
      p.deleteInventory( 'obj22' )
      p.addInventory( 'obj23', '[me]: I should bring the second one to the sled.' )
      removeObject( midx, name )
    }
    if( p.checkInventiory( 'obj24', 'e' ) ) {
      p.deleteInventory( 'obj24' )
      p.addInventory( 'obj25', '[me]: And here is the last one!' )
      removeObject( midx, name )
    }
    return true
  }
}

const createPresent = ( x, y, name, script ) => {
  return { 
      name: name,
      symbol: 'prs',
      position: [ x, y ],
      type: 'no-layout',
      visible: true,
      action: script
    }
}

const removeObject = ( midx, name ) => {
  objects[ midx ] = objects[ midx ].filter( (x) => x.name != name )
}

const addObject = ( midx, object ) => {
  objects[ midx ].push( object )
}

