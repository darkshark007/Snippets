# ==============================================================================================================
# Recursive Object Dump Script
# By Stephen Bush, Incyte Studios
# Based loosely on a post from "stacker"
#   https://blender.stackexchange.com/questions/1879/is-it-possible-to-dump-an-objects-properties-and-methods
STRING_TYPES = [
    "<type 'str'>",
    "<type 'unicode'>",
    "<class 'django.utils.safestring.SafeText'>"

    "<class 'str'>",
    "<class 'unicode'>",
]

PRIMITIVE_LITERAL_TYPES = [
    "<type 'int'>",
    "<type 'long'>",
    "<type 'float'>",
    "<type 'bool'>",
    "<type 'unicode'>",
    "<type 'str'>",
    "<type 'NoneType'>",
    
    "<class 'int'>",
    "<class 'long'>",
    "<class 'float'>",
    "<class 'bool'>",
    "<class 'unicode'>",
    "<class 'str'>",
    "<class 'NoneType'>",
]

def dump(obj, root_string="obj", depth=0, cache=None, maxdepth=3, print_full_tree=False, print_skips=False, print_type=False, recurse_primitives=False, print_methods=False, print_duplicates=True, payload=None):
    # Set up the recursive payload
    if payload == None:
        payload = {}
    if 'cache' not in payload:
        if cache == None:
            cache = []
        payload['cache'] = cache
        payload['cache_map'] = {}
    if 'maxdepth' not in payload:
        payload['maxdepth'] = maxdepth
    if 'print_full_tree' not in payload:
        payload['print_full_tree'] = print_full_tree
    if 'print_skips' not in payload:
        payload['print_skips'] = print_skips
    if 'print_type' not in payload:
        payload['print_type'] = print_type
    if 'print_duplicates' not in payload:
        payload['print_duplicates'] = print_duplicates
    if 'print_methods' not in payload:
        payload['print_methods'] = print_methods
    if 'recurse_primitives' not in payload:
        payload['recurse_primitives'] = recurse_primitives

    # Quit early if we reach max depth
    if depth >= payload['maxdepth']:
        return

    # Figure out the print structure
    if payload['print_full_tree'] == True:
        tree_string = root_string
    else:
        split = root_string.split('.')
        tree_string = '    '*(len(split)-1)+split[-1]

    # Print the object
    type_str = str(type(obj))
    if obj == "__skip":
        if payload['print_skips'] == True:
            print("%s skipped" % (tree_string))
        return
    else:
        preview_str = str(obj)
        if len(preview_str) > 180:
            preview_str = preview_str[0:180]+"..."
        if payload['print_type'] == True:
            print("%s.$type = '%s'" % (tree_string, type_str))
        # If we've already seen, note the recursive reference
        if str(type(obj)) == "<class 'builtin_function_or_method'>" and payload['print_methods'] is False:
            return
        if obj in payload['cache']:
            if payload['print_duplicates'] == True:
                try:
                    cache_map_str = payload['cache_map'][obj]
                except:
                    cache_map_str = 'Unknown path'
                print(u"%s encountered before @ [%s] (%s)" % (tree_string, cache_map_str, preview_str))
            return
        print(u"%s = %s" % (tree_string, preview_str))


    # We don't necessarily want to expand primitives, they add a lot of noise
    if str(type(obj)) in PRIMITIVE_LITERAL_TYPES and payload['recurse_primitives'] is False:
        return

    # Update the cache so we don't recurse on objects we've already seen
    if type_str not in PRIMITIVE_LITERAL_TYPES:
        payload['cache'].append(obj)
        try:
            payload['cache_map'][obj] = root_string
        except:
            pass

    # for attr in dir(obj):
    #    if hasattr( obj, attr ):
    #        print( "%s.%s = %s" % (root_string, attr, getattr(obj, attr)))

    if str(type(obj)) == "<type 'dict'>" or str(type(obj)) == "<class 'dict'>":
        for key in obj.keys():
            dump(obj[key], "%s.%s" % (root_string, key), depth + 1, payload=payload)
    elif str(type(obj)) == "<type 'list'>" or str(type(obj)) == "<class 'list'>":
        for idx, val in enumerate(obj):
            dump(val, "%s.%s" % (root_string, idx), depth + 1, payload=payload)
    elif str(type(obj)) in STRING_TYPES:
        pass
    else:
        local_cache = []
        try:
            count = 0
            for val in iter(obj):
                if val not in local_cache:
                    local_cache.append(val)
                    dump(val, "%s.(%s)" % (root_string, count), depth + 1, payload=payloads)
                count += 1
        except Exception:
            pass

        try:
            for prop, value in vars(obj).iteritems():
                if vaue not in local_cache:
                    local_cache.append(val)
                    if prop.startswith('__'):
                        dump("__skip", "%s.%s" % (root_string, prop), depth + 1, payload=payload)
                        continue
                    dump(value, "%s.%s" % (root_string, prop), depth + 1, payload=payload)
        except Exception:
            pass

        try:
            for prop in dir(obj):
                if getattr(obj, prop) not in local_cache:
                    local_cache.append(getattr(obj, prop))
                    if prop.startswith('__'):
                        dump("__skip", "%s.%s" % (root_string, prop), depth + 1, payload=payload)
                        continue
                    dump(getattr(obj, prop), "%s.%s" % (root_string, prop), depth + 1, payload=payload)
        except Exception:
            pass


# ==============================================================================================================