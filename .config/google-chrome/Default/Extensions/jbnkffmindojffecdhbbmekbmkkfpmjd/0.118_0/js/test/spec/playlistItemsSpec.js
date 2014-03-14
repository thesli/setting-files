define(["background/collection/playlistItems","test/testUtility"],function(t,e){"use strict";describe("PlaylistItems",function(){it("Should not be able to contain duplicates by id",function(){var l=new t([],{playlistId:""});expect(l.length).toEqual(0);var a=e.buildPlaylistItem();a.set("id",123);var i=e.buildPlaylistItem();i.set("id",123),i.get("video").set("id","12345678910");var n=l.add(a);expect(l.length).toEqual(1),expect(n).not.toEqual(null);var o=l.add(i);expect(l.length).toEqual(1),expect(o).not.toEqual(null)}),it("Should not be able to contain duplicates by videoId",function(){var l=new t([],{playlistId:""});expect(l.length).toEqual(0);var a=e.buildPlaylistItem(),i=e.buildPlaylistItem(),n=l.add(a);expect(l.length).toEqual(1),expect(n).not.toEqual(null);var o=l.add(i);expect(l.length).toEqual(1),expect(o).not.toEqual(null)})})});