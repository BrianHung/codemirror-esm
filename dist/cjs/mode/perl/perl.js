'use strict';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/perl/perl.js
function perl(CodeMirror) {

  CodeMirror.defineMode("perl",function(){
    var PERL={                                      
      '->'                            :   4,
      '++'                            :   4,
      '--'                            :   4,
      '**'                            :   4,
      '=~'                            :   4,
      '!~'                            :   4,
      '*'                             :   4,
      '/'                             :   4,
      '%'                             :   4,
      'x'                             :   4,
      '+'                             :   4,
      '-'                             :   4,
      '.'                             :   4,
      '<<'                            :   4,
      '>>'                            :   4,
      '<'                             :   4,
      '>'                             :   4,
      '<='                            :   4,
      '>='                            :   4,
      'lt'                            :   4,
      'gt'                            :   4,
      'le'                            :   4,
      'ge'                            :   4,
      '=='                            :   4,
      '!='                            :   4,
      '<=>'                           :   4,
      'eq'                            :   4,
      'ne'                            :   4,
      'cmp'                           :   4,
      '~~'                            :   4,
      '&'                             :   4,
      '|'                             :   4,
      '^'                             :   4,
      '&&'                            :   4,
      '||'                            :   4,
      '//'                            :   4,
      '..'                            :   4,
      '...'                           :   4,
      '?'                             :   4,
      ':'                             :   4,
      '='                             :   4,
      '+='                            :   4,
      '-='                            :   4,
      '*='                            :   4,  
      ','                             :   4,
      '=>'                            :   4,
      '::'                            :   4,
      'not'                           :   4,
      'and'                           :   4,
      'or'                            :   4,
      'xor'                           :   4,
      'BEGIN'                         :   [5,1],
      'END'                           :   [5,1],
      'PRINT'                         :   [5,1],
      'PRINTF'                        :   [5,1],
      'GETC'                          :   [5,1],
      'READ'                          :   [5,1],
      'READLINE'                      :   [5,1],
      'DESTROY'                       :   [5,1],
      'TIE'                           :   [5,1],
      'TIEHANDLE'                     :   [5,1],
      'UNTIE'                         :   [5,1],
      'STDIN'                         :    5,
      'STDIN_TOP'                     :    5,
      'STDOUT'                        :    5,
      'STDOUT_TOP'                    :    5,
      'STDERR'                        :    5,
      'STDERR_TOP'                    :    5,
      '$ARG'                          :    5,
      '$_'                            :    5,
      '@ARG'                          :    5,
      '@_'                            :    5,
      '$LIST_SEPARATOR'               :    5,
      '$"'                            :    5,
      '$PROCESS_ID'                   :    5,
      '$PID'                          :    5,
      '$$'                            :    5,
      '$REAL_GROUP_ID'                :    5,
      '$GID'                          :    5,
      '$('                            :    5,
      '$EFFECTIVE_GROUP_ID'           :    5,
      '$EGID'                         :    5,
      '$)'                            :    5,
      '$PROGRAM_NAME'                 :    5,
      '$0'                            :    5,
      '$SUBSCRIPT_SEPARATOR'          :    5,
      '$SUBSEP'                       :    5,
      '$;'                            :    5,
      '$REAL_USER_ID'                 :    5,
      '$UID'                          :    5,
      '$<'                            :    5,
      '$EFFECTIVE_USER_ID'            :    5,
      '$EUID'                         :    5,
      '$>'                            :    5,
      '$a'                            :    5,
      '$b'                            :    5,
      '$COMPILING'                    :    5,
      '$^C'                           :    5,
      '$DEBUGGING'                    :    5,
      '$^D'                           :    5,
      '${^ENCODING}'                  :    5,
      '$ENV'                          :    5,
      '%ENV'                          :    5,
      '$SYSTEM_FD_MAX'                :    5,
      '$^F'                           :    5,
      '@F'                            :    5,
      '${^GLOBAL_PHASE}'              :    5,
      '$^H'                           :    5,
      '%^H'                           :    5,
      '@INC'                          :    5,
      '%INC'                          :    5,
      '$INPLACE_EDIT'                 :    5,
      '$^I'                           :    5,
      '$^M'                           :    5,
      '$OSNAME'                       :    5,
      '$^O'                           :    5,
      '${^OPEN}'                      :    5,
      '$PERLDB'                       :    5,
      '$^P'                           :    5,
      '$SIG'                          :    5,
      '%SIG'                          :    5,
      '$BASETIME'                     :    5,
      '$^T'                           :    5,
      '${^TAINT}'                     :    5,
      '${^UNICODE}'                   :    5,
      '${^UTF8CACHE}'                 :    5,
      '${^UTF8LOCALE}'                :    5,
      '$PERL_VERSION'                 :    5,
      '$^V'                           :    5,
      '${^WIN32_SLOPPY_STAT}'         :    5,
      '$EXECUTABLE_NAME'              :    5,
      '$^X'                           :    5,
      '$1'                            :    5, 
      '$MATCH'                        :    5,
      '$&'                            :    5,
      '${^MATCH}'                     :    5,
      '$PREMATCH'                     :    5,
      '$`'                            :    5,
      '${^PREMATCH}'                  :    5,
      '$POSTMATCH'                    :    5,
      "$'"                            :    5,
      '${^POSTMATCH}'                 :    5,
      '$LAST_PAREN_MATCH'             :    5,
      '$+'                            :    5,
      '$LAST_SUBMATCH_RESULT'         :    5,
      '$^N'                           :    5,
      '@LAST_MATCH_END'               :    5,
      '@+'                            :    5,
      '%LAST_PAREN_MATCH'             :    5,
      '%+'                            :    5,
      '@LAST_MATCH_START'             :    5,
      '@-'                            :    5,
      '%LAST_MATCH_START'             :    5,
      '%-'                            :    5,
      '$LAST_REGEXP_CODE_RESULT'      :    5,
      '$^R'                           :    5,
      '${^RE_DEBUG_FLAGS}'            :    5,
      '${^RE_TRIE_MAXBUF}'            :    5,
      '$ARGV'                         :    5,
      '@ARGV'                         :    5,
      'ARGV'                          :    5,
      'ARGVOUT'                       :    5,
      '$OUTPUT_FIELD_SEPARATOR'       :    5,
      '$OFS'                          :    5,
      '$,'                            :    5,
      '$INPUT_LINE_NUMBER'            :    5,
      '$NR'                           :    5,
      '$.'                            :    5,
      '$INPUT_RECORD_SEPARATOR'       :    5,
      '$RS'                           :    5,
      '$/'                            :    5,
      '$OUTPUT_RECORD_SEPARATOR'      :    5,
      '$ORS'                          :    5,
      '$\\'                           :    5,
      '$OUTPUT_AUTOFLUSH'             :    5,
      '$|'                            :    5,
      '$ACCUMULATOR'                  :    5,
      '$^A'                           :    5,
      '$FORMAT_FORMFEED'              :    5,
      '$^L'                           :    5,
      '$FORMAT_PAGE_NUMBER'           :    5,
      '$%'                            :    5,
      '$FORMAT_LINES_LEFT'            :    5,
      '$-'                            :    5,
      '$FORMAT_LINE_BREAK_CHARACTERS' :    5,
      '$:'                            :    5,
      '$FORMAT_LINES_PER_PAGE'        :    5,
      '$='                            :    5,
      '$FORMAT_TOP_NAME'              :    5,
      '$^'                            :    5,
      '$FORMAT_NAME'                  :    5,
      '$~'                            :    5,
      '${^CHILD_ERROR_NATIVE}'        :    5,
      '$EXTENDED_OS_ERROR'            :    5,
      '$^E'                           :    5,
      '$EXCEPTIONS_BEING_CAUGHT'      :    5,
      '$^S'                           :    5,
      '$WARNING'                      :    5,
      '$^W'                           :    5,
      '${^WARNING_BITS}'              :    5,
      '$OS_ERROR'                     :    5,
      '$ERRNO'                        :    5,
      '$!'                            :    5,
      '%OS_ERROR'                     :    5,
      '%ERRNO'                        :    5,
      '%!'                            :    5,
      '$CHILD_ERROR'                  :    5,
      '$?'                            :    5,
      '$EVAL_ERROR'                   :    5,
      '$@'                            :    5,
      '$OFMT'                         :    5,
      '$#'                            :    5,
      '$*'                            :    5,
      '$ARRAY_BASE'                   :    5,
      '$['                            :    5,
      '$OLD_PERL_VERSION'             :    5,
      '$]'                            :    5,
      'if'                            :[1,1],
      elsif                           :[1,1],
      'else'                          :[1,1],
      'while'                         :[1,1],
      unless                          :[1,1],
      'for'                           :[1,1],
      foreach                         :[1,1],
      'abs'                           :1,     
      accept                          :1,     
      alarm                           :1,     
      'atan2'                         :1,     
      bind                            :1,     
      binmode                         :1,     
      bless                           :1,     
      bootstrap                       :1,     
      'break'                         :1,     
      caller                          :1,     
      chdir                           :1,     
      chmod                           :1,     
      chomp                           :1,     
      chop                            :1,     
      chown                           :1,     
      chr                             :1,     
      chroot                          :1,     
      close                           :1,     
      closedir                        :1,     
      connect                         :1,     
      'continue'                      :[1,1], 
      'cos'                           :1,     
      crypt                           :1,     
      dbmclose                        :1,     
      dbmopen                         :1,     
      'default'                       :1,     
      defined                         :1,     
      'delete'                        :1,     
      die                             :1,     
      'do'                            :1,     
      dump                            :1,     
      each                            :1,     
      endgrent                        :1,     
      endhostent                      :1,     
      endnetent                       :1,     
      endprotoent                     :1,     
      endpwent                        :1,     
      endservent                      :1,     
      eof                             :1,     
      'eval'                          :1,     
      'exec'                          :1,     
      exists                          :1,     
      exit                            :1,     
      'exp'                           :1,     
      fcntl                           :1,     
      fileno                          :1,     
      flock                           :1,     
      fork                            :1,     
      format                          :1,     
      formline                        :1,     
      getc                            :1,     
      getgrent                        :1,     
      getgrgid                        :1,     
      getgrnam                        :1,     
      gethostbyaddr                   :1,     
      gethostbyname                   :1,     
      gethostent                      :1,     
      getlogin                        :1,     
      getnetbyaddr                    :1,     
      getnetbyname                    :1,     
      getnetent                       :1,     
      getpeername                     :1,     
      getpgrp                         :1,     
      getppid                         :1,     
      getpriority                     :1,     
      getprotobyname                  :1,     
      getprotobynumber                :1,     
      getprotoent                     :1,     
      getpwent                        :1,     
      getpwnam                        :1,     
      getpwuid                        :1,     
      getservbyname                   :1,     
      getservbyport                   :1,     
      getservent                      :1,     
      getsockname                     :1,     
      getsockopt                      :1,     
      given                           :1,     
      glob                            :1,     
      gmtime                          :1,     
      'goto'                          :1,     
      grep                            :1,     
      hex                             :1,     
      'import'                        :1,     
      index                           :1,     
      'int'                           :1,     
      ioctl                           :1,     
      'join'                          :1,     
      keys                            :1,     
      kill                            :1,     
      last                            :1,     
      lc                              :1,     
      lcfirst                         :1,     
      length                          :1,     
      'link'                          :1,     
      listen                          :1,     
      local                           : 2,    
      localtime                       :1,     
      lock                            :1,     
      'log'                           :1,     
      lstat                           :1,     
      m                               :null,  
      map                             :1,     
      mkdir                           :1,     
      msgctl                          :1,     
      msgget                          :1,     
      msgrcv                          :1,     
      msgsnd                          :1,     
      my                              : 2,    
      'new'                           :1,     
      next                            :1,     
      no                              :1,     
      oct                             :1,     
      open                            :1,     
      opendir                         :1,     
      ord                             :1,     
      our                             : 2,    
      pack                            :1,     
      'package'                       :1,     
      pipe                            :1,     
      pop                             :1,     
      pos                             :1,     
      print                           :1,     
      printf                          :1,     
      prototype                       :1,     
      push                            :1,     
      q                               :null,  
      qq                              :null,  
      qr                              :null,  
      quotemeta                       :null,  
      qw                              :null,  
      qx                              :null,  
      rand                            :1,     
      read                            :1,     
      readdir                         :1,     
      readline                        :1,     
      readlink                        :1,     
      readpipe                        :1,     
      recv                            :1,     
      redo                            :1,     
      ref                             :1,     
      rename                          :1,     
      require                         :1,     
      reset                           :1,     
      'return'                        :1,     
      reverse                         :1,     
      rewinddir                       :1,     
      rindex                          :1,     
      rmdir                           :1,     
      s                               :null,  
      say                             :1,     
      scalar                          :1,     
      seek                            :1,     
      seekdir                         :1,     
      select                          :1,     
      semctl                          :1,     
      semget                          :1,     
      semop                           :1,     
      send                            :1,     
      setgrent                        :1,     
      sethostent                      :1,     
      setnetent                       :1,     
      setpgrp                         :1,     
      setpriority                     :1,     
      setprotoent                     :1,     
      setpwent                        :1,     
      setservent                      :1,     
      setsockopt                      :1,     
      shift                           :1,     
      shmctl                          :1,     
      shmget                          :1,     
      shmread                         :1,     
      shmwrite                        :1,     
      shutdown                        :1,     
      'sin'                           :1,     
      sleep                           :1,     
      socket                          :1,     
      socketpair                      :1,     
      'sort'                          :1,     
      splice                          :1,     
      'split'                         :1,     
      sprintf                         :1,     
      'sqrt'                          :1,     
      srand                           :1,     
      stat                            :1,     
      state                           :1,     
      study                           :1,     
      'sub'                           :1,     
      'substr'                        :1,     
      symlink                         :1,     
      syscall                         :1,     
      sysopen                         :1,     
      sysread                         :1,     
      sysseek                         :1,     
      system                          :1,     
      syswrite                        :1,     
      tell                            :1,     
      telldir                         :1,     
      tie                             :1,     
      tied                            :1,     
      time                            :1,     
      times                           :1,     
      tr                              :null,  
      truncate                        :1,     
      uc                              :1,     
      ucfirst                         :1,     
      umask                           :1,     
      undef                           :1,     
      unlink                          :1,     
      unpack                          :1,     
      unshift                         :1,     
      untie                           :1,     
      use                             :1,     
      utime                           :1,     
      values                          :1,     
      vec                             :1,     
      wait                            :1,     
      waitpid                         :1,     
      wantarray                       :1,     
      warn                            :1,     
      when                            :1,     
      write                           :1,     
      y                               :null}; 

    var RXstyle="string-2";
    var RXmodifiers=/[goseximacplud]/;              

    function tokenChain(stream,state,chain,style,tail){     
      state.chain=null;                               
      state.style=null;
      state.tail=null;
      state.tokenize=function(stream,state){
        var e=false,c,i=0;
        while(c=stream.next()){
          if(c===chain[i]&&!e){
            if(chain[++i]!==undefined){
              state.chain=chain[i];
              state.style=style;
              state.tail=tail;}
            else if(tail)
              { stream.eatWhile(tail); }
            state.tokenize=tokenPerl;
            return style;}
          e=!e&&c=="\\";}
        return style;};
      return state.tokenize(stream,state);}

    function tokenSOMETHING(stream,state,string){
      state.tokenize=function(stream,state){
        if(stream.string==string)
          { state.tokenize=tokenPerl; }
        stream.skipToEnd();
        return "string";};
      return state.tokenize(stream,state);}

    function tokenPerl(stream,state){
      if(stream.eatSpace())
        { return null; }
      if(state.chain)
        { return tokenChain(stream,state,state.chain,state.style,state.tail); }
      if(stream.match(/^\-?[\d\.]/,false))
        { if(stream.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))
          { return 'number'; } }
      if(stream.match(/^<<(?=\w)/)){                  
        stream.eatWhile(/\w/);
        return tokenSOMETHING(stream,state,stream.current().substr(2));}
      if(stream.sol()&&stream.match(/^\=item(?!\w)/)){
        return tokenSOMETHING(stream,state,'=cut');}
      var ch=stream.next();
      if(ch=='"'||ch=="'"){                           
        if(prefix(stream, 3)=="<<"+ch){
          var p=stream.pos;
          stream.eatWhile(/\w/);
          var n=stream.current().substr(1);
          if(n&&stream.eat(ch))
            { return tokenSOMETHING(stream,state,n); }
          stream.pos=p;}
        return tokenChain(stream,state,[ch],"string");}
      if(ch=="q"){
        var c=look(stream, -2);
        if(!(c&&/\w/.test(c))){
          c=look(stream, 0);
          if(c=="x"){
            c=look(stream, 1);
            if(c=="("){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
            if(c=="["){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
            if(c=="{"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
            if(c=="<"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}
            if(/[\^'"!~\/]/.test(c)){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[stream.eat(c)],RXstyle,RXmodifiers);}}
          else if(c=="q"){
            c=look(stream, 1);
            if(c=="("){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[")"],"string");}
            if(c=="["){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["]"],"string");}
            if(c=="{"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["}"],"string");}
            if(c=="<"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[">"],"string");}
            if(/[\^'"!~\/]/.test(c)){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[stream.eat(c)],"string");}}
          else if(c=="w"){
            c=look(stream, 1);
            if(c=="("){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[")"],"bracket");}
            if(c=="["){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["]"],"bracket");}
            if(c=="{"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["}"],"bracket");}
            if(c=="<"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[">"],"bracket");}
            if(/[\^'"!~\/]/.test(c)){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[stream.eat(c)],"bracket");}}
          else if(c=="r"){
            c=look(stream, 1);
            if(c=="("){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
            if(c=="["){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
            if(c=="{"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
            if(c=="<"){
              eatSuffix(stream, 2);
              return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}
            if(/[\^'"!~\/]/.test(c)){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[stream.eat(c)],RXstyle,RXmodifiers);}}
          else if(/[\^'"!~\/(\[{<]/.test(c)){
            if(c=="("){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[")"],"string");}
            if(c=="["){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,["]"],"string");}
            if(c=="{"){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,["}"],"string");}
            if(c=="<"){
              eatSuffix(stream, 1);
              return tokenChain(stream,state,[">"],"string");}
            if(/[\^'"!~\/]/.test(c)){
              return tokenChain(stream,state,[stream.eat(c)],"string");}}}}
      if(ch=="m"){
        var c=look(stream, -2);
        if(!(c&&/\w/.test(c))){
          c=stream.eat(/[(\[{<\^'"!~\/]/);
          if(c){
            if(/[\^'"!~\/]/.test(c)){
              return tokenChain(stream,state,[c],RXstyle,RXmodifiers);}
            if(c=="("){
              return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
            if(c=="["){
              return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
            if(c=="{"){
              return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
            if(c=="<"){
              return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}}}}
      if(ch=="s"){
        var c=/[\/>\]})\w]/.test(look(stream, -2));
        if(!c){
          c=stream.eat(/[(\[{<\^'"!~\/]/);
          if(c){
            if(c=="[")
              { return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers); }
            if(c=="{")
              { return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers); }
            if(c=="<")
              { return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers); }
            if(c=="(")
              { return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers); }
            return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}
      if(ch=="y"){
        var c=/[\/>\]})\w]/.test(look(stream, -2));
        if(!c){
          c=stream.eat(/[(\[{<\^'"!~\/]/);
          if(c){
            if(c=="[")
              { return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers); }
            if(c=="{")
              { return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers); }
            if(c=="<")
              { return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers); }
            if(c=="(")
              { return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers); }
            return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}
      if(ch=="t"){
        var c=/[\/>\]})\w]/.test(look(stream, -2));
        if(!c){
          c=stream.eat("r");if(c){
            c=stream.eat(/[(\[{<\^'"!~\/]/);
            if(c){
              if(c=="[")
                { return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers); }
              if(c=="{")
                { return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers); }
              if(c=="<")
                { return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers); }
              if(c=="(")
                { return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers); }
              return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}}
      if(ch=="`"){
        return tokenChain(stream,state,[ch],"variable-2");}
      if(ch=="/"){
        if(!/~\s*$/.test(prefix(stream)))
          { return "operator"; }
        else
          { return tokenChain(stream,state,[ch],RXstyle,RXmodifiers); }}
      if(ch=="$"){
        var p=stream.pos;
        if(stream.eatWhile(/\d/)||stream.eat("{")&&stream.eatWhile(/\d/)&&stream.eat("}"))
          { return "variable-2"; }
        else
          { stream.pos=p; }}
      if(/[$@%]/.test(ch)){
        var p=stream.pos;
        if(stream.eat("^")&&stream.eat(/[A-Z]/)||!/[@$%&]/.test(look(stream, -2))&&stream.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)){
          var c=stream.current();
          if(PERL[c])
            { return "variable-2"; }}
        stream.pos=p;}
      if(/[$@%&]/.test(ch)){
        if(stream.eatWhile(/[\w$\[\]]/)||stream.eat("{")&&stream.eatWhile(/[\w$\[\]]/)&&stream.eat("}")){
          var c=stream.current();
          if(PERL[c])
            { return "variable-2"; }
          else
            { return "variable"; }}}
      if(ch=="#"){
        if(look(stream, -2)!="$"){
          stream.skipToEnd();
          return "comment";}}
      if(/[:+\-\^*$&%@=<>!?|\/~\.]/.test(ch)){
        var p=stream.pos;
        stream.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/);
        if(PERL[stream.current()])
          { return "operator"; }
        else
          { stream.pos=p; }}
      if(ch=="_"){
        if(stream.pos==1){
          if(suffix(stream, 6)=="_END__"){
            return tokenChain(stream,state,['\0'],"comment");}
          else if(suffix(stream, 7)=="_DATA__"){
            return tokenChain(stream,state,['\0'],"variable-2");}
          else if(suffix(stream, 7)=="_C__"){
            return tokenChain(stream,state,['\0'],"string");}}}
      if(/\w/.test(ch)){
        var p=stream.pos;
        if(look(stream, -2)=="{"&&(look(stream, 0)=="}"||stream.eatWhile(/\w/)&&look(stream, 0)=="}"))
          { return "string"; }
        else
          { stream.pos=p; }}
      if(/[A-Z]/.test(ch)){
        var l=look(stream, -2);
        var p=stream.pos;
        stream.eatWhile(/[A-Z_]/);
        if(/[\da-z]/.test(look(stream, 0))){
          stream.pos=p;}
        else {
          var c=PERL[stream.current()];
          if(!c)
            { return "meta"; }
          if(c[1])
            { c=c[0]; }
          if(l!=":"){
            if(c==1)
              { return "keyword"; }
            else if(c==2)
              { return "def"; }
            else if(c==3)
              { return "atom"; }
            else if(c==4)
              { return "operator"; }
            else if(c==5)
              { return "variable-2"; }
            else
              { return "meta"; }}
          else
            { return "meta"; }}}
      if(/[a-zA-Z_]/.test(ch)){
        var l=look(stream, -2);
        stream.eatWhile(/\w/);
        var c=PERL[stream.current()];
        if(!c)
          { return "meta"; }
        if(c[1])
          { c=c[0]; }
        if(l!=":"){
          if(c==1)
            { return "keyword"; }
          else if(c==2)
            { return "def"; }
          else if(c==3)
            { return "atom"; }
          else if(c==4)
            { return "operator"; }
          else if(c==5)
            { return "variable-2"; }
          else
            { return "meta"; }}
        else
          { return "meta"; }}
      return null;}

    return {
      startState: function() {
        return {
          tokenize: tokenPerl,
          chain: null,
          style: null,
          tail: null
        };
      },
      token: function(stream, state) {
        return (state.tokenize || tokenPerl)(stream, state);
      },
      lineComment: '#'
    };
  });

  CodeMirror.registerHelper("wordChars", "perl", /[\w$]/);

  CodeMirror.defineMIME("text/x-perl", "perl");

  function look(stream, c){
    return stream.string.charAt(stream.pos+(c||0));
  }

  function prefix(stream, c){
    if(c){
      var x=stream.pos-c;
      return stream.string.substr((x>=0?x:0),c);}
    else {
      return stream.string.substr(0,stream.pos-1);
    }
  }

  function suffix(stream, c){
    var y=stream.string.length;
    var x=y-stream.pos+1;
    return stream.string.substr(stream.pos,(c&&c<y?c:x));
  }

  function eatSuffix(stream, c){
    var x=stream.pos+c;
    var y;
    if(x<=0)
      { stream.pos=0; }
    else if(x>=(y=stream.string.length-1))
      { stream.pos=y; }
    else
      { stream.pos=x; }
  }

}

module.exports = perl;
//# sourceMappingURL=perl.js.map
